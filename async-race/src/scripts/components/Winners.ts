export class Winners {
  btnPagePrev: HTMLButtonElement;
  btnPageNext: HTMLButtonElement;

  tableSortById: HTMLElement;
  tableSortByWins: HTMLElement;
  tableSortByTime: HTMLElement;

  constructor() {
    this.tableSortById = document.querySelector('.win-table__header-number');
    this.tableSortByWins = document.querySelector('.win-table__header-wins');
    this.tableSortByTime = document.querySelector('.win-table__header-time');

    this.btnPagePrev = document.querySelector('.page-nav_prev');
    this.btnPageNext = document.querySelector('.page-nav_next');
  }

  seekerBtnPagePrev(btnPagePrevHanvler: (btnPrev: HTMLButtonElement, btnNext: HTMLButtonElement) => void) {
    this.btnPagePrev.addEventListener('click', () => btnPagePrevHanvler(this.btnPagePrev, this.btnPageNext));
  }
  seekerBtnPageNext(btnPageNextHanvler: (btnPrev: HTMLButtonElement, btnNext: HTMLButtonElement) => void) {
    this.btnPageNext.addEventListener('click', () => btnPageNextHanvler(this.btnPagePrev, this.btnPageNext));
  }

  seekerTableHeaderId(
    sortIdHandler: (idHeader: HTMLElement, winsHeader: HTMLElement, timeHeader: HTMLElement) => void
  ) {
    this.tableSortById.addEventListener('click', () =>
      sortIdHandler(this.tableSortById, this.tableSortByWins, this.tableSortByTime)
    );
  }
  seekerTableHeaderWins(
    sortWinsHandler: (idHeader: HTMLElement, winsHeader: HTMLElement, timeHeader: HTMLElement) => void
  ) {
    this.tableSortByWins.addEventListener('click', () =>
      sortWinsHandler(this.tableSortById, this.tableSortByWins, this.tableSortByTime)
    );
  }
  seekerTableHeaderTime(
    sortTimeHandler: (idHeader: HTMLElement, winsHeader: HTMLElement, timeHeader: HTMLElement) => void
  ) {
    this.tableSortByTime.addEventListener('click', () =>
      sortTimeHandler(this.tableSortById, this.tableSortByWins, this.tableSortByTime)
    );
  }
}
