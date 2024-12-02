import {Routes} from '@angular/router';
import {MessageListComponent} from './components/messages/message-list.component';
import {PartnerListComponent} from './components/partners/partner-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/messages', pathMatch: 'full' },
  { path: 'messages', component: MessageListComponent },
  { path: 'partners', component: PartnerListComponent },
];
