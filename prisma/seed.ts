import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create 6 Cavs players
  const players = await Promise.all([
    prisma.player.create({
      data: { firstName: 'Donovan', lastName: 'Mitchell', jerseyNumber: 45, position: 'Guard' }
    }),
    prisma.player.create({
      data: { firstName: 'Darius', lastName: 'Garland', jerseyNumber: 10, position: 'Guard' }
    }),
    prisma.player.create({
      data: { firstName: 'Evan', lastName: 'Mobley', jerseyNumber: 4, position: 'Forward' }
    }),
    prisma.player.create({
      data: { firstName: 'Jarrett', lastName: 'Allen', jerseyNumber: 31, position: 'Center' }
    }),
    prisma.player.create({
      data: { firstName: 'Sam', lastName: 'Merrill', jerseyNumber: 5, position: 'Guard' }
    }),
    prisma.player.create({
      data: { firstName: 'DeAndre', lastName: 'Hunter', jerseyNumber: 12, position: 'Forward' }
    }),
  ]);

  console.log(`✅ Created ${players.length} players`);

  // Zone names
  const zones = ['Left Corner', 'Left Wing', 'Top of Key', 'Right Wing', 'Right Corner'];
  
  let totalTests = 0;

  // Generate 6-8 tests per player
  for (const player of players) {
    const numTests = Math.floor(Math.random() * 3) + 8;
    
    for (let i = 0; i < numTests; i++) {
      // Random date in last 90 days
      const daysAgo = Math.floor(Math.random() * 90);
      const startTime = new Date();
      startTime.setDate(startTime.getDate() - daysAgo);
      startTime.setHours(Math.floor(Math.random() * 4) + 15);
      startTime.setMinutes(Math.floor(Math.random() * 60));
      startTime.setSeconds(0);
      
      // Realistic 3-point shooting percentage (35-60%)
      const basePercentage = 0.35 + Math.random() * 0.25;
      const made = Math.round(100 * basePercentage);
      
      // Realistic test duration (8-12 minutes for 100 shots)
      const durationMinutes = 8 + Math.random() * 4;
      const endTime = new Date(startTime.getTime() + durationMinutes * 60000);
      
      // 60% standard tests, 40% zone tests
      const isZoneTest = Math.random() < 0.4;
      
      if (isZoneTest) {
        const test = await prisma.test.create({
          data: {
            startTime,
            endTime,
            shots: 100,
            made,
            playerId: player.id,
            testType: 'zone',
          }
        });
        
        // Distribute made shots across 5 zones
        let remainingMade = made;
        let remainingShots = 100;
        
        for (let j = 0; j < 5; j++) {
          const shotsInZone = 20;
          
          // Last zone gets whatever's remaining
          const zoneMade = j === 4 
            ? remainingMade 
            : Math.min(
                Math.round((remainingMade / remainingShots) * shotsInZone + (Math.random() - 0.5) * 4),
                shotsInZone
              );
          
          await prisma.zoneStat.create({
            data: {
              testId: test.id,
              zone: zones[j],
              made: Math.max(0, zoneMade),
              shots: shotsInZone,
            }
          });
          
          remainingMade -= zoneMade;
          remainingShots -= shotsInZone;
        }
      } else {
        await prisma.test.create({
          data: {
            startTime,
            endTime,
            shots: 100,
            made,
            playerId: player.id,
            testType: 'standard',
          }
        });
      }
      
      totalTests++;
    }
  }
  
  console.log(`✅ Created ${totalTests} tests with realistic data`);
  console.log('🎉 Seed complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });