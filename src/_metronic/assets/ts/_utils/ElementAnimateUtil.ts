export class ElementAnimateUtil {
    public static animate(
        from: number,
        to: number,
        duration: number,
        update: Function,
        complete?: Function
    ) {
        /**
         * TinyAnimate.easings
         *  Adapted from jQuery Easing
         */
        const easings = {
            linear: function (t: number, b: number, c: number, d: number) {
                return (c * t) / d + b
            },
        }

        // Create mock done() function if necessary
        if (!complete) {
            complete = function () {}
        }

        // Animation loop
        // let canceled = false;
        const change = to - from

        function loop(timestamp: number) {
            var time = (timestamp || +new Date()) - start

            if (time >= 0) {
                update(easings.linear(time, from, change, duration))
            }
            if (time >= 0 && time >= duration) {
                update(to)
                if (complete) {
                    complete()
                }
            } else {
                window.requestAnimationFrame(loop)
            }
        }

        update(from)

        // Start animation loop
        const start =
            window.performance && window.performance.now ? window.performance.now() : +new Date()

        window.requestAnimationFrame(loop)
    }
}
