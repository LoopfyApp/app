import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodevalidationPage } from './codevalidation.page';

const routes: Routes = [
  {
    path: '',
    component: CodevalidationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodevalidationPageRoutingModule {}
