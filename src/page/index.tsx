import { createPortal } from 'react-dom'
import { IPageProps, usePageLogic } from './page.utils'
import s from './page.module.scss'
import { MAP_ID } from './vjMap'

/** 页面入口 */
export function Page(props: IPageProps) {

  // 获取所有状态和操作函数
  const {
    state,
    actions
  }  = usePageLogic(props)

  return (
    <div className={s.root}>
     {createPortal(
      <div
        id={MAP_ID}
        className={s.root}
      >
      </div>,
      document.getElementById('root')!
    )}
    </div>
  )
}