import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { PaginatedResult, Pagination } from 'src/app/_models/pagination';
import { ReadingList } from 'src/app/_models/reading-list';
import { AccountService } from 'src/app/_services/account.service';
import { Action, ActionFactoryService, ActionItem } from 'src/app/_services/action-factory.service';
import { ActionService } from 'src/app/_services/action.service';
import { ImageService } from 'src/app/_services/image.service';
import { ReadingListService } from 'src/app/_services/reading-list.service';

@Component({
  selector: 'app-reading-lists',
  templateUrl: './reading-lists.component.html',
  styleUrls: ['./reading-lists.component.scss']
})
export class ReadingListsComponent implements OnInit {

  lists: ReadingList[] = [];
  loadingLists = false;
  pagination!: Pagination;
  actions: ActionItem<ReadingList>[] = [];
  isAdmin: boolean = false;

  constructor(private readingListService: ReadingListService, public imageService: ImageService, private actionFactoryService: ActionFactoryService,
    private accountService: AccountService, private toastr: ToastrService, private router: Router, private actionService: ActionService) { }

  ngOnInit(): void {
    this.loadPage();

    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      if (user) {
        this.isAdmin = this.accountService.hasAdminRole(user);
      }
    });
  }

  getActions(readingList: ReadingList) {
    return this.actionFactoryService.getReadingListActions(this.handleReadingListActionCallback.bind(this)).filter(action => this.readingListService.actionListFilter(action, readingList, this.isAdmin));
  }

  performAction(action: ActionItem<any>, readingList: ReadingList) {
    if (typeof action.callback === 'function') {
      action.callback(action.action, readingList);
    }
  }

  handleReadingListActionCallback(action: Action, readingList: ReadingList) {
    switch(action) {
      case Action.Delete:
        this.readingListService.delete(readingList.id).subscribe(() => {
          this.toastr.success('Reading list deleted');
          this.loadPage();
        });
        break;
      case Action.Edit:
        this.actionService.editReadingList(readingList, (updatedList: ReadingList) => {
          // Reload information around list
          readingList = updatedList;
        });
        break;
    }
  }

  getPage() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('page');
  }

  loadPage() {
    const page = this.getPage();
    if (page != null) {
      this.pagination.currentPage = parseInt(page, 10);
    }
    this.loadingLists = true;

    this.readingListService.getReadingLists(true, this.pagination?.currentPage, this.pagination?.itemsPerPage).pipe(take(1)).subscribe((readingLists: PaginatedResult<ReadingList[]>) => {
      this.lists = readingLists.result;
      this.pagination = readingLists.pagination;
      this.loadingLists = false;
      window.scrollTo(0, 0);
    });
  }

  onPageChange(pagination: Pagination) {
    window.history.replaceState(window.location.href, '', window.location.href.split('?')[0] + '?page=' + this.pagination.currentPage);
    this.loadPage();
  }

  handleClick(list: ReadingList) {
    this.router.navigateByUrl('lists/' + list.id);
  }

}
