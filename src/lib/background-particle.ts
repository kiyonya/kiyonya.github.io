
export interface ParticleSprite {
    type: 'cross' | 'triangle' | 'rect',
    size: number,
    rotate: number,
    x: number,
    y: number,
    dx: number,
    dy: number,
    drotate: number,
    dsize: number
}

export default class BackgroundParticle {

    private MAX_PARTICALE_COUNT = 30

    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private isRendering: boolean = false
    private renderAnimationId: number | null = null
    private particleSprites: ParticleSprite[] = []


    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
        this.handleResize()

    }

    public mount() {
        this.isRendering = true
        this.particleRenderLoop()
        this.listenEvents()
    }

    public unmount() {
        this.isRendering = false
        if (this.renderAnimationId) {
            cancelAnimationFrame(this.renderAnimationId)
        }
        this.removeEvents()
    }

    private listenEvents() {
        window.addEventListener('resize', this.handleResize.bind(this))
    }

    private removeEvents() {
        window.removeEventListener('resize', this.handleResize.bind(this))
    }

    private handleResize() {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight

    }

    private particleRenderLoop() {
        if (!this.isRendering) { return }
        this.tickParticlePosition()
        this.removeOutOfScreenParticle()
        this.createRandomParticle()
        this.renderFrame()
        this.renderAnimationId = requestAnimationFrame(this.particleRenderLoop.bind(this))
    }

    private tickParticlePosition() {
        for (const particle of this.particleSprites) {
            particle.x += particle.dx
            particle.y += particle.dy
            particle.rotate += particle.drotate
            particle.size += particle.dsize
        }
    }

    private removeOutOfScreenParticle() {
        this.particleSprites = this.particleSprites.filter(particle => {
            return particle.x + particle.size > 0 && particle.x - particle.size < this.canvas.width
                && particle.y + particle.size > 0 && particle.y - particle.size < this.canvas.height && particle.size > 5
        })
    }

    private createRandomParticle() {
        const counts = Math.max(0, this.MAX_PARTICALE_COUNT - this.particleSprites.length)
        if (counts <= 0) { return }
        for (let i = 0; i < counts; i++) {
            const size = this.randin(20, 30)
            const particle: ParticleSprite = {
                type: ['cross', 'triangle', 'rect'][this.randin(0, 2)] as ParticleSprite['type'],
                size,
                rotate: this.randin(0, 360),
                x: this.randin(0, this.canvas.width),
                y: this.randin(0, this.canvas.height),
                dx: 0,
                dy: -0.1,
                drotate: this.randin(0, 1),
                dsize: this.randin(-0.01,-0.05)
            }
            this.particleSprites.push(particle)
        }
    }

    private renderParticle(particle: ParticleSprite) {
        this.ctx.save()
        this.ctx.translate(particle.x, particle.y)
        this.ctx.rotate(particle.rotate * Math.PI / 180)
        this.ctx.fillStyle = 'rgb(255, 255, 255)'
        switch (particle.type) {
            case 'cross':
                this.ctx.fillRect(-particle.size / 2, -particle.size / 10, particle.size, particle.size / 5)
                this.ctx.fillRect(-particle.size / 10, -particle.size / 2, particle.size / 5, particle.size)
                break
            case 'triangle':
                this.ctx.beginPath()
                this.ctx.moveTo(0, -particle.size / 2)
                this.ctx.lineTo(particle.size / 2, particle.size / 2)
                this.ctx.lineTo(-particle.size / 2, particle.size / 2)
                this.ctx.closePath()
                this.ctx.fill()
                break
            case 'rect':
                this.ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size)
                break
        }
        this.ctx.restore()
    }

    private renderFrame() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        for (const particle of this.particleSprites) {
            this.renderParticle(particle)
        }
    }

    private randin(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
}