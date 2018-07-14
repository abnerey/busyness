export abstract class LoaderType {
    static readonly BALL_PULSE = {
        type: 'ball-pulse',
        divs: 3,
    } as LoaderType;
    static readonly BALL_GRID_PULSE = {
        type: 'ball-grid-pulse',
        divs: 9,
    } as LoaderType;
    static readonly BALL_CLIP_ROTATE = {
        type: 'ball-clip-rotate',
        divs: 1,
    } as LoaderType;
    static readonly BALL_CLIP_ROTATE_PULSE = {
        type: 'ball-clip-rotate-pulse',
        divs: 2,
    } as LoaderType;
    static readonly SQUARE_SPIN = {
        type: 'square-spin',
        divs: 1,
    } as LoaderType;
    static readonly BALL_CLIP_ROTATE_MULTIPLE = {
        type: 'ball-clip-rotate-multiple',
        divs: 2,
    } as LoaderType;
    static readonly BALL_PULSE_RISE = {
        type: 'ball-pulse-rise',
        divs: 5,
    } as LoaderType;
    static readonly BALL_ROTATE = {
        type: 'ball-rotate',
        divs: 1,
    } as LoaderType;
    static readonly CUBE_TRANSITION = {
        type: 'cube-transition',
        divs: 2,
    } as LoaderType;
    static readonly BALL_ZIG_ZAG = {
        type: 'ball-zig-zag',
        divs: 2,
    } as LoaderType;
    static readonly BALL_ZIG_ZAG_DEFLECT = {
        type: 'ball-zig-zag-deflect',
        divs: 2,
    } as LoaderType;
    static readonly BALL_TRIANGLE_PATH = {
        type: 'ball-triangle-path',
        divs: 3,
    } as LoaderType;
    static readonly BALL_SCALE = {
        type: 'ball-scale',
        divs: 1,
    } as LoaderType;
    static readonly LINE_SCALE = {
        type: 'line-scale',
        divs: 5,
    } as LoaderType;
    static readonly LINE_SCALE_PARTY = {
        type: 'line-scale-party',
        divs: 4,
    } as LoaderType;
    static readonly BALL_SCALE_MULTIPLE = {
        type: 'ball-scale-multiple',
        divs: 3,
    } as LoaderType;
    static readonly BALL_PULSE_SYNC = {
        type: 'ball-pulse-sync',
        divs: 3,
    } as LoaderType;
    static readonly BALL_BEAT = {
        type: 'ball-beat',
        divs: 3,
    } as LoaderType;
    static readonly LINE_SCALE_PULSE_OUT = {
        type: 'line-scale-pulse-out',
        divs: 5,
    } as LoaderType;
    static readonly LINE_SCALE_PULSE_OUT_RAPID = {
        type: 'line-scale-pulse-out-rapid',
        divs: 5,
    } as LoaderType;
    static readonly BALL_SCALE_RIPPLE = {
        type: 'ball-scale-ripple',
        divs: 1,
    } as LoaderType;
    static readonly BALL_SCALE_RIPPLE_MULTIPLE = {
        type: 'ball-scale-ripple-multiple',
        divs: 3,
    } as LoaderType;
    static readonly BALL_SPIN_FADE_LOADER = {
        type: 'ball-spin-fade-loader',
        divs: 8,
    } as LoaderType;
    static readonly LINE_SPIN_FADE_LOADER = {
        type: 'line-spin-fade-loader',
        divs: 8,
    } as LoaderType;
    static readonly TRIANGLE_SKEW_SPIN = {
        type: 'triangle-skew-spin',
        divs: 1,
    } as LoaderType;
    static readonly PACMAN = {
        type: 'pacman',
        divs: 5,
    } as LoaderType;
    static readonly BALL_GRID_BEAT = {
        type: 'ball-grid-beat',
        divs: 9,
    } as LoaderType;
    static readonly SEMI_CIRCLE_SPIN = {
        type: 'semi-circle-spin',
        divs: 1
    } as LoaderType;

    type: string;
    divs: number;
}
