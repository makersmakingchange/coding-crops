/**
 * @license
 * Copyright 2026 Neil Squire Society - Makers Making Change
 * SPDX-License-Identifier: Apache-2.0
 */

import plantSound from "../assets/sounds/plant.mp3";
import waterSound from "../assets/sounds/water.mp3";
import harvestSound from "../assets/sounds/harvest.mp3";

export enum SoundEffect {
    Plant = "plant",
    Water = "water",
    Harvest = "harvest",
    Error = "error",
}

class AudioManager {
    private context: AudioContext;
    private buffers = new Map<string, AudioBuffer>();

    constructor() {
        this.context = new AudioContext();
    }

    async load(name: string, url: string) {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await this.context.decodeAudioData(arrayBuffer);

        this.buffers.set(name, audioBuffer);
    }

    // load all sounds into memory
    initialize() {
        this.load("plant", plantSound);
        this.load("water", waterSound);
        this.load("harvest", harvestSound);
    }


    play(name: string) {
        if (this.context.state === "suspended") {
            this.context.resume();
        }

        const buffer = this.buffers.get(name);
        if (!buffer) return;

        const source = this.context.createBufferSource();
        source.buffer = buffer;
        source.connect(this.context.destination);
        source.start(0);
    }

    resume() {
        if (this.context.state === "suspended") {
            this.context.resume();
        }
    }
}

export default new AudioManager();