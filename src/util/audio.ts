let audioContext: AudioContext | null = null

function playNote(frequency: number): void {
  if (!audioContext) {
    // @ts-expect-error -- TODO: unknown type on window
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- TODO: unknown type on window
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
  }

  const oscillator = audioContext.createOscillator()
  oscillator.type = 'sine'
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)

  const gainNode = audioContext.createGain()
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5)

  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillator.start()
  oscillator.stop(audioContext.currentTime + 0.5)
}

function getNoteFrequency(index: number): number {
  return 261.63 * Math.pow(2, index / 12)
}

export { playNote, getNoteFrequency }
