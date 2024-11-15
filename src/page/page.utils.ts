import { useMemo } from 'react'
import { useStates } from 'src/utils'

/** state */
export interface IPageState {

}

/** props */
export interface IPageProps {

}

export function usePageLogic(props: IPageProps) {

  const [ state, setState, getNewState ] = useStates<IPageState>({

  })
  const {} = state

  const actions = useMemo(() => new class {
    /** 初始化 */
    init = () => {

    }
  }, [])

  return {
    state,
    actions
  }
}