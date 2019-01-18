import { smoothScroll } from './invokeSmoothScroll'

const STEP_MS = 50

export const completeAutoScroll = (target, tuner) => {
  smoothScroll()
  // <<<<<< The whole logic is designed for calibrating and slowing down the window scroll process >>>>>>
  // target is the assessmentHeader Bottom, it is equal to the top of summary
  // tuner is postion fine tuning for best effect
  if (target) {
    let windowOffset = window.pageYOffset
    const viewPortHeight = window.innerHeight
    const stickyComponentsHeight = 125
    // here to adjust the sticky components total height according to current UI
    const finalTarget = target - stickyComponentsHeight + tuner
    // finalTarget is finally where we want to scroll to
    const distance = windowOffset - finalTarget
    // total distance need scroll up
    let times = Math.ceil(windowOffset / viewPortHeight)
    // times means how many times we need repeat the scrollTo for the whole process
    const step = distance / times
    // step can be a negative number，negative means move up

    const stepMoving = () => {
      if (times < 1) {
        clearInterval(repeat)
      } else {
        windowOffset -= step
        times -= 1
        window.scrollTo({
          left: 0,
          top: windowOffset,
          behavior: 'smooth',
        })
      }
    }

    const repeat = setInterval(stepMoving, STEP_MS)

    // just use setInterval to individually fire the scrollTo so just need a minor delay like '1'
  }
}
