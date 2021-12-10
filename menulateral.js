class SideMenu {
	constructor() {
		this.menu = [...document.querySelectorAll('.menu-item')];
		this.handleIn = this.handlerIn.bind(this);
		this.handleOut = this.handlerOut.bind(this);
		this.init();
	}
	
	init() {
		this.menu.map(item => {
			item.addEventListener('mouseenter', this.handleIn, false)
			item.addEventListener('mouseleave', this.handleOut, false)
		})
	}
	
	handlerIn(e) {
			e.target.children[1].classList.add('text--visible');
	}
	
	handlerOut(e) {
			e.target.children[1].classList.remove('text--visible');
	}
}

new SideMenu();