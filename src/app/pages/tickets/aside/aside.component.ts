import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IMenuType } from 'src/app/models/menuType';
import { ITourTypeSelect } from 'src/app/models/tours';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { TicketsService } from 'src/app/services/tickets/tickets.service';


@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {

  public menuTypes: IMenuType[];
  public selectedMenuType: IMenuType;

  tourTypes: ITourTypeSelect[] = [
    {label: 'Все', value: 'all'},
    {label: 'Одиночный', value: 'single'},
    {label: 'Групповой', value: 'multi'}
  ]

  @Output() updateMenuType: EventEmitter<IMenuType> = new EventEmitter()

  constructor(private ticketService: TicketsService,
            private messageService: MessageService,
            private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.menuTypes = [
      {type: 'custom', label : 'Обычное'},
      {type: 'extended', label : 'Расширенное'}
    ]
  }

  selectDate(ev: string) {
    console.log('ev', ev)
    this.ticketService.updateTour({date:ev})
  }


  changeType(ev: {ev: Event, value: IMenuType}): void {
    console.log('ev', ev)
    this.updateMenuType.emit(ev.value);
  }

  changeTourType(ev:  {ev: Event, value: ITourTypeSelect}): void {
    this.ticketService.updateTour(ev.value)
  }

  initRestError(): void {
    this.ticketService.getError().subscribe({ next:(data)=> {
  
    },
    error: (err) => {
      console.log('err', err)
    }
    });
    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error'});
   }

   initSettingsData(): void {
    this.settingsService.loadUserSettingsSubject({
      saveToken: false
    });
   }

}
