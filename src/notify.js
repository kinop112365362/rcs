import { combination } from './combination'

export const notify = (...args) => {
  const infrom = ([target, fnKey, data]) => {
    combination.$connectAsync(target, () => {
      combination.proxySubjects[target].next({
        fnKey,
        data,
      })
    })
  }
  if (args.length > 1) {
    if (args && args?.length > 0) {
      args.forEach((arg) => {
        infrom(arg)
      })
    }
  } else {
    if (args[0][0] === '@@router') {
      combination.$routerBroadcast(args[0][2])
    } else {
      infrom(...args)
    }
  }
}
