import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '@assets/loadables/Home/Home'
import NotFound from '@assets/loadables/NotFound/NotFound'
import Settings from '@assets/loadables/Settings/Settings'
import { routePrefix } from '@assets/config/app'
import Loading from '@assets/components/Loading'
import SalePopsNotifications from '@assets/pages/SalePopsNotifications/SalePopsNotifications'
import AnnouncementBarList from '@assets/pages/AnnoucementBarList/AnnouncemenBartList'
import AnnouncementBarForm from '@assets/pages/AnnouncementBarForm/AnnouncementBarForm'

const FullscreenPageA = React.lazy(() => import('../pages/FullscreenPageA'))

const Routes = ({ prefix = routePrefix }) => (
  <Suspense fallback={<Loading/>}>
    <Switch>
      <Route exact path={prefix + '/'} component={Home}/>
      <Route exact path={prefix + '/settings'} component={Settings}/>
      <Route exact path={prefix + '/fullscreen-page-a'} component={FullscreenPageA}/>
      <Route exact path={prefix + '/notifications'} component={SalePopsNotifications}/>
      <Route exact path={prefix + '/announcements'} component={AnnouncementBarList}/>
      <Route exact path={prefix + '/announcements/create'} component={AnnouncementBarForm}/>
      <Route exact path={prefix + '/announcements/:id'} component={AnnouncementBarForm}/>
      <Route path="*" component={NotFound}/>
    </Switch>
  </Suspense>
)

export default Routes
