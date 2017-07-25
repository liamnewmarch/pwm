const pulseCurveArray = Float32Array.of(
  ...Array(128).fill(-1),
  ...Array(128).fill(1)
);
const shapeCurveArray = Float32Array.of(1, 1);

class PulseOscillatorNode extends OscillatorNode {
  constructor(audioContext, options={}) {
    options.type = 'sawtooth';
    options.pulseWidth = options.pulseWidth || 0;
    
    super(audioContext, options);

    const pulseWaveShaper = new WaveShaperNode(audioContext, {
      curve: pulseCurveArray,
    });

    const pulseWidth = new GainNode(audioContext, {
      gain: options.pulseWidth,
    });

    const shapeWaveShaper = new WaveShaperNode(audioContext, {
      curve: shapeCurveArray,
    });

    this.pulseWidth = pulseWidth.gain;
    this.connect(pulseWaveShaper);
    pulseWidth.connect(pulseWaveShaper);
    this.connect(shapeWaveShaper)
    shapeWaveShaper.connect(pulseWidth);

    this.connect = pulseWaveShaper.connect.bind(pulseWaveShaper);
    this.disconnect = pulseWaveShaper.disconnect.bind(pulseWaveShaper);
  }
}