
import { Exercise } from '../types/exercise';

export const exercises: Exercise[] = [
  {
    id: 'neck-stretch',
    name: 'Neck Stretch',
    shortDescription: 'Gently tuck chin to chest, then tilt ear to shoulder',
    fullInstructions: 'Sit up straight. Slowly lower your chin toward your chest and hold for 15 seconds. Return to center. Gently tilt your right ear toward your right shoulder, hold for 15 seconds. Return to center and repeat on the left side.',
    safetyTips: 'Move slowly and gently. Never force the stretch. Stop if you feel pain.',
    seniorModifications: 'Perform seated with back support. Reduce range of motion if needed.',
    category: 'neck',
    difficulty: 'easy',
    duration: 45,
    points: 10
  },
  {
    id: 'neck-rotation',
    name: 'Neck Rotation',
    shortDescription: 'Sit tall, gently turn head left, then right',
    fullInstructions: 'Sit with good posture. Keep shoulders relaxed. Slowly turn your head to look over your right shoulder, hold for 10 seconds. Return to center, then turn to look over your left shoulder for 10 seconds.',
    safetyTips: 'Move slowly and smoothly. Avoid quick jerky movements.',
    seniorModifications: 'Use chair with good back support. Turn head only as far as comfortable.',
    category: 'neck',
    difficulty: 'easy',
    duration: 30,
    points: 10
  },
  {
    id: 'shoulder-shrugs',
    name: 'Shoulder Shrugs',
    shortDescription: 'Lift shoulders towards ears, then relax down',
    fullInstructions: 'Sit or stand with arms at your sides. Slowly lift your shoulders up toward your ears, hold for 5 seconds, then slowly lower them down. Repeat 10 times.',
    safetyTips: 'Keep movements controlled. Breathe normally throughout.',
    seniorModifications: 'Perform seated. Use smaller range of motion if needed.',
    category: 'shoulder',
    difficulty: 'easy',
    duration: 60,
    points: 15
  },
  {
    id: 'posterior-shoulder-stretch',
    name: 'Posterior Shoulder Stretch',
    shortDescription: 'Reach arm across chest, gently pull elbow',
    fullInstructions: 'Bring your right arm across your chest. Use your left hand to gently pull your right elbow toward your chest. Hold for 20 seconds. Switch arms and repeat.',
    safetyTips: 'Pull gently. You should feel a stretch, not pain.',
    seniorModifications: 'Perform seated. Use less pressure when pulling the elbow.',
    category: 'shoulder',
    difficulty: 'easy',
    duration: 40,
    points: 15
  },
  {
    id: 'chest-opener',
    name: 'Chest/Shoulder Opener',
    shortDescription: 'Clasp hands behind back, lift arms overhead',
    fullInstructions: 'Clasp your hands behind your back. Straighten your arms and gently lift them away from your body. Hold for 15 seconds. Then, lift your arms overhead and gently stretch upward.',
    safetyTips: 'Only lift as high as comfortable. Breathe deeply.',
    seniorModifications: 'Perform seated. Lift arms only as high as comfortable.',
    category: 'shoulder',
    difficulty: 'medium',
    duration: 30,
    points: 20
  },
  {
    id: 'spinal-rotation',
    name: 'Upper-Body Twist',
    shortDescription: 'Sit, cross arms, slowly rotate left and right',
    fullInstructions: 'Sit with feet flat on floor. Cross your arms over your chest. Keeping your hips facing forward, slowly rotate your upper body to the right, hold for 10 seconds. Return to center and rotate to the left.',
    safetyTips: 'Keep movements slow and controlled. Don\'t force the rotation.',
    seniorModifications: 'Use chair with back support. Reduce rotation range if needed.',
    category: 'back',
    difficulty: 'easy',
    duration: 40,
    points: 15
  },
  {
    id: 'back-extension',
    name: 'Seated Back Extension',
    shortDescription: 'Hands on lower back, gently arch backward',
    fullInstructions: 'Sit forward in your chair. Place your hands on your lower back. Gently arch your back backward, pushing your chest forward. Hold for 10 seconds, then return to starting position.',
    safetyTips: 'Move gently. Stop if you feel any pain in your back.',
    seniorModifications: 'Use minimal back extension. Focus on good posture.',
    category: 'back',
    difficulty: 'easy',
    duration: 30,
    points: 15
  },
  {
    id: 'wrist-stretch',
    name: 'Forearm (Wrist) Stretch',
    shortDescription: 'Extend arm, bend wrist up and down',
    fullInstructions: 'Extend your right arm in front of you, palm down. Use your left hand to gently bend your wrist upward. Hold 15 seconds. Then turn palm up and bend wrist downward. Hold 15 seconds. Repeat with other arm.',
    safetyTips: 'Apply gentle pressure only. Hold stretches steadily.',
    seniorModifications: 'Support extended arm on desk if needed.',
    category: 'wrist',
    difficulty: 'easy',
    duration: 60,
    points: 10
  },
  {
    id: 'knee-to-chest',
    name: 'Seated Knee-to-Chest',
    shortDescription: 'Sit, hug one knee to chest',
    fullInstructions: 'Sit forward in your chair. Lift your right knee and hug it gently toward your chest with both hands. Hold for 20 seconds. Lower and repeat with left leg.',
    safetyTips: 'Pull gently. Stop if you feel any discomfort.',
    seniorModifications: 'Lift knee only as high as comfortable. Use chair arms for support.',
    category: 'leg',
    difficulty: 'easy',
    duration: 40,
    points: 15
  },
  {
    id: 'hip-marching',
    name: 'Hip Marching',
    shortDescription: 'Sit, lift one knee up, then lower',
    fullInstructions: 'Sit with good posture. Lift your right knee up toward your chest, then lower it back down. Repeat 10 times, then switch to left leg for 10 repetitions.',
    safetyTips: 'Control the movement. Don\'t let your leg drop.',
    seniorModifications: 'Lift knee only as high as comfortable. Use chair arms for balance.',
    category: 'leg',
    difficulty: 'easy',
    duration: 60,
    points: 20
  },
  {
    id: 'ankle-flex',
    name: 'Ankle Flex and Point',
    shortDescription: 'Straighten leg, point toes down, then pull up',
    fullInstructions: 'Sit and extend your right leg straight out. Point your toes down toward the floor, hold for 5 seconds. Then flex your foot by pulling your toes up toward your shin, hold for 5 seconds. Repeat 10 times, then switch legs.',
    safetyTips: 'Move slowly and smoothly through the range of motion.',
    seniorModifications: 'Support leg on another chair if needed. Reduce repetitions if fatigued.',
    category: 'leg',
    difficulty: 'easy',
    duration: 60,
    points: 15
  },
  {
    id: 'calf-stretch',
    name: 'Calf Stretch',
    shortDescription: 'Step one foot back, press heel down',
    fullInstructions: 'Stand facing a wall or desk. Step your right foot back about 3 feet. Keep your right leg straight and press your heel firmly into the ground. Hold for 30 seconds. Switch legs and repeat.',
    safetyTips: 'Keep back leg straight. Use wall or desk for balance.',
    seniorModifications: 'Stand closer to wall for better balance. Reduce stretch intensity.',
    category: 'leg',
    difficulty: 'medium',
    duration: 60,
    points: 20
  },
  {
    id: 'chair-pushups',
    name: 'Chair Push-ups',
    shortDescription: 'Push-ups using chair for support',
    fullInstructions: 'Stand arm\'s length from a sturdy chair. Place hands on seat, walk feet back. Lower chest toward chair, then push back up. Repeat 10 times.',
    safetyTips: 'Ensure chair is stable. Keep body straight.',
    seniorModifications: 'Use higher surface like desk. Reduce repetitions as needed.',
    category: 'full-body',
    difficulty: 'medium',
    duration: 90,
    points: 25
  }
];
