import { getTdfSnapshot } from './src/lib/cyclingFeed.ts';

console.log('Testing getTdfSnapshot...');

try {
  const data = await getTdfSnapshot(0); // No caching for test
  console.log('Success! Data received:');
  console.log('- Race status:', data.raceStatus);
  console.log('- Current stage:', data.currentStage);
  console.log('- Total stages:', data.stages.length);
  console.log('- Source:', data.source);

  if (data.stages.length > 0) {
    console.log('- First stage:', JSON.stringify(data.stages[0], null, 2));
    console.log('- Stage 1 found:', !!data.stages.find(s => s.stage === 1));
  } else {
    console.log('ERROR: No stages in data!');
  }
} catch (error) {
  console.error('FAILED:', error.message);
}
