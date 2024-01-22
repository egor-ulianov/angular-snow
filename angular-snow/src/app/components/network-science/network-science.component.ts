import { Component } from '@angular/core';

@Component({
  selector: 'app-network-science',
  templateUrl: './network-science.component.html',
  styleUrls: ['./network-science.component.css']
})
export class NetworkScienceComponent {
  public pageIndex: number = 0;

  public onNextPage(): void
  {
    if (this.pageIndex == 3)
      this.pageIndex = 0;
    else
      this.pageIndex = Math.min(this.pageIndex + 1, 3);
  }
}
