export const guideContent = {
  basics: {
    title: 'Stick Shift Basics',
    icon: 'book',
    sections: [
      {
        title: 'How Manual Transmission Works',
        content: `A manual transmission uses a clutch and gear selector to transfer power from the engine to the wheels. Unlike an automatic, you control when gears change by pressing the clutch pedal and moving the gear lever.

The clutch connects and disconnects the engine from the transmission. When pressed, it allows you to change gears without damaging the transmission. When released, it transfers engine power to the wheels.`,
      },
      {
        title: 'The Clutch',
        content: `The clutch pedal is your left foot's responsibility. It has three important zones:

• **Fully pressed** - Engine disconnected from wheels, safe to shift
• **Engagement point (friction zone)** - Where the clutch starts to grab
• **Fully released** - Full power transfer

Finding the engagement point is the key to smooth driving. Practice in a flat, safe area until you can feel exactly where it starts to bite.`,
      },
      {
        title: 'Starting from a Stop',
        content: `1. Press the clutch fully and brake
2. Shift into 1st gear
3. Release the brake
4. Slowly release the clutch to the engagement point
5. When you feel the car start to move, gradually add gas
6. Continue releasing the clutch smoothly while adding throttle

**Tip:** Listen to the engine - if it starts to struggle, you need more gas. If RPMs spike without movement, you're releasing the clutch too slow.`,
      },
      {
        title: 'Upshifting',
        content: `1. Accelerate in your current gear
2. Release the gas pedal
3. Press the clutch fully
4. Move the gear lever to the next gear
5. Release the clutch (can be faster than starting)
6. Apply gas smoothly

**When to shift up:** Generally shift when RPMs reach 2,500-3,500 for normal driving. You can shift higher for spirited driving, but stay below redline.`,
      },
      {
        title: 'Downshifting',
        content: `1. Release the gas
2. Press the clutch
3. Shift to the lower gear
4. Release the clutch smoothly
5. Apply gas as needed

**When to downshift:** When slowing down, when you need more power (passing, hills), or when engine RPMs drop too low for your current gear.

**Warning:** Never downshift into a gear that would put your RPMs above redline!`,
      },
    ],
  },
  hills: {
    title: 'Starting on Hills',
    icon: 'mountain',
    sections: [
      {
        title: 'The Handbrake Method',
        content: `This is the most reliable technique for beginners:

1. Stop on the hill with foot on brake
2. Engage the handbrake firmly
3. Keep clutch pressed, shift to 1st
4. Find the clutch engagement point
5. Add gas (more than on flat ground - 2,000+ RPM)
6. As you feel the car want to move forward, release handbrake
7. Continue releasing clutch while maintaining gas

The car will stay still until you have enough power to move forward.`,
      },
      {
        title: 'The Heel-Toe Hill Start',
        content: `For more advanced drivers:

1. Heel on brake, toe positioned for gas
2. Press clutch with left foot
3. Shift to 1st gear
4. Release clutch to engagement point
5. Begin pressing gas with toe while heel holds brake
6. When engine loads up, release brake and continue

This method is faster but requires more coordination and practice.`,
      },
      {
        title: 'Common Hill Start Mistakes',
        content: `• **Rolling back** - Not enough gas or releasing clutch too slowly
• **Stalling** - Releasing clutch too fast without enough gas
• **Burning the clutch** - Slipping the clutch for too long under load

If you start to roll back, don't panic. Press the brake, hold the clutch, and start over with the handbrake method.`,
      },
    ],
  },
  advanced: {
    title: 'Advanced Techniques',
    icon: 'lightning',
    sections: [
      {
        title: 'Rev Matching',
        content: `Rev matching eliminates the jerk when downshifting by matching engine RPM to wheel speed before releasing the clutch.

1. Press the clutch
2. Shift to the lower gear
3. "Blip" the throttle to raise RPMs
4. Release the clutch when RPMs match what the lower gear needs

**How to calculate target RPM:** Multiply current RPM by (new gear ratio ÷ current gear ratio). The simulator above can help you practice!`,
      },
      {
        title: 'Heel-Toe Downshifting',
        content: `This combines braking with rev-matched downshifts - essential for performance driving.

1. Begin braking with the ball of your right foot
2. Press the clutch
3. Downshift
4. While still braking, rotate your right foot to blip the throttle with your heel (or toe, depending on pedal layout)
5. Release clutch smoothly
6. Continue braking as needed

This keeps the car balanced while preparing for corner exit.`,
      },
      {
        title: 'Double Clutching',
        content: `A technique from the days before synchromesh transmissions. Rarely needed in modern cars but useful to understand:

1. Press clutch, shift to neutral
2. Release clutch
3. Blip throttle to match RPM
4. Press clutch again
5. Shift into the new gear
6. Release clutch

**When it's useful:** Old vehicles, trucks with non-synchro transmissions, or when synchros are worn.`,
      },
    ],
  },
  tips: {
    title: 'Common Mistakes & Tips',
    icon: 'alert',
    sections: [
      {
        title: 'Riding the Clutch',
        content: `**What it is:** Keeping your foot resting on the clutch pedal while driving.

**Why it's bad:** Even slight pressure engages the release bearing and can cause the clutch to slip, causing premature wear.

**Fix:** Only touch the clutch when shifting. Rest your left foot on the dead pedal or floor.`,
      },
      {
        title: 'Lugging the Engine',
        content: `**What it is:** Running at very low RPMs in a high gear, causing the engine to struggle.

**Why it's bad:** Puts excessive stress on engine bearings, causes carbon buildup, and can damage the drivetrain.

**Fix:** Downshift when RPMs drop below 1,500-2,000. The car should accelerate smoothly, not shudder.`,
      },
      {
        title: 'Money Shifting',
        content: `**What it is:** Accidentally shifting into a lower gear at high RPM, causing the engine to over-rev.

**Example:** Shifting from 4th to 2nd instead of 4th to 5th at 6,000 RPM.

**Why it's catastrophic:** Can instantly destroy your engine. Valves can hit pistons, rods can bend.

**Prevention:** Always be deliberate with shifts. Know your shift pattern. Never rush.`,
      },
      {
        title: 'When to Shift - RPM vs Feel',
        content: `**By RPM:**
• Normal driving: Shift up at 2,500-3,500 RPM
• Acceleration: Shift up at 4,500-6,000 RPM (before redline)
• Downshift when below 2,000 RPM or when you need power

**By feel:**
• The engine sounds strained - shift up
• The car isn't responding to throttle - shift down
• Engine sounds high and buzzy - shift up

As you gain experience, you'll develop an intuitive sense for the right moment to shift.`,
      },
      {
        title: 'Top Tips for New Manual Drivers',
        content: `1. **Practice in empty parking lots** - Get comfortable before hitting traffic
2. **Flat surfaces first** - Master the basics before tackling hills
3. **Smooth is fast** - Focus on smooth inputs, speed comes later
4. **Don't panic when you stall** - Everyone does it, just restart calmly
5. **Use the handbrake on hills** - There's no shame in it
6. **Listen to the engine** - It tells you what it needs
7. **Keep a safe following distance** - Give yourself time to react`,
      },
    ],
  },
}

export const guideOrder = ['basics', 'hills', 'advanced', 'tips']
