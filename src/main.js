class madePopUpWindow {
    constructor (
        number, 
        transferWindowToFooter, 
        transferWindowToContainer, 
        closeSelectedWindow
    ) {
        this.windowNumber = number;
        this.transferWindowToFooter = transferWindowToFooter;
        this.transferWindowToContainer = transferWindowToContainer;
        this.closeSelectedWindow = closeSelectedWindow;

        this.buttonPanel = document.createElement('div');
        this.buttonPanel.classList.add('buttonPanel');

        const buttonClasses = ['collapseWindow', 'maximizeWindow', 'closeWindow'];
        buttonClasses.forEach(name => {
            let button = document.createElement('button');
            button.classList.add(name, 'controlButtons');
            button.addEventListener('click', this[name].bind(this));
            this.buttonPanel.appendChild(button);
        })

        this.windowContent = document.createElement('div');
        this.windowContent.classList.add('windowContent');
        this.windowContent.append(`Window № ${this.windowNumber}`);

        this.popUpWindow = document.createElement('section');
        this.popUpWindow.classList.add('popUpWindow', 'initialSizeWindow');
        this.popUpWindow.appendChild(this.buttonPanel);
        this.popUpWindow.appendChild(this.windowContent);

        return this;
    }

    collapseWindow () {
        let collapseWindow = this.popUpWindow;
        collapseWindow.classList.remove('initialSizeWindow');
        collapseWindow.classList.remove('maximizeSizeWindow');
        collapseWindow.classList.add('minimizeSizeWindow');
        this.transferWindowToFooter(collapseWindow);
    }

    maximizeWindow () {
        let maximizeWindow = this.popUpWindow;
        maximizeWindow.classList.remove('initialSizeWindow');
        maximizeWindow.classList.remove('minimizeSizeWindow');
        maximizeWindow.classList.add('maximizeSizeWindow');
        this.transferWindowToContainer(maximizeWindow);
    }

    closeWindow () {
        this.closeSelectedWindow(this.popUpWindow);
    }
}

//------------------------------------------------------------------------------------------

class App {
    constructor() {
        this.windowsCount = 1;
        this.dragObject = {};
        this.createWindowButton = document.getElementById('createWindow');
        this.containerForWindows = document.getElementById('containerForWindows');
        if(!this.createWindowButton || !this.containerForWindows) {
            console.log('Unexpected page layout');
        }
    }

    run() {
        this.initEventListeners();
    }

    initEventListeners() {
        this.createWindowButton.addEventListener('click', this.createWindow.bind(this));
        this.containerForWindows.addEventListener('mousedown', this.mousedownOnWindow.bind(this));
        this.containerForWindows.addEventListener('mousemove', this.mousemoveWithWindow.bind(this));
        document.addEventListener('mouseup', this.mouseupOnBox.bind(this));
    }

    createWindow() {
        let newWindow = new madePopUpWindow(
            this.windowsCount, 
            this.transferWindowToFooter,
            this.transferWindowToContainer,
            this.closeSelectedWindow
        );
        let fragment = document.createDocumentFragment();
        let indent = 20 * newWindow.windowNumber + 100 + 'px';
        newWindow.popUpWindow.style.top = indent;
        newWindow.popUpWindow.style.left = indent;
        newWindow.popUpWindow.style.zIndex = this.windowsCount;
        fragment.appendChild(newWindow.popUpWindow);
        containerForWindows.append(fragment);
        this.windowsCount += 1;
    }

    mousedownOnWindow(event) {
        if (event.which !=1) return;
        var elem = event.target.closest('.popUpWindow');
        if (!elem) return;
        this.dragObject.elem = elem;
        this.dragObject.downX = event.pageX;
        this.dragObject.downY = event.pageY;
    }

    mousemoveWithWindow(event) {
        if (!this.dragObject.elem) return;
    
        if (!this.dragObject.avatar) { 
            let moveX = event.pageX - this.dragObject.downX;
            let moveY = event.pageY - this.dragObject.downY;
            if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
                return; 
            }
    
            this.dragObject.avatar = this.dragObject.elem; 
            
            let coords = this.getCoords(this.dragObject.avatar);
            this.dragObject.shiftX = this.dragObject.downX - coords.left;
            this.dragObject.shiftY = this.dragObject.downY - coords.top;
            
            this.dragObject.previousZIndex = this.dragObject.elem.style.zIndex;
            this.dragObject.avatar.style.zIndex = 9999;
        }
    
        this.dragObject.avatar.style.left = event.pageX - this.dragObject.shiftX + 'px';
        this.dragObject.avatar.style.top = event.pageY - this.dragObject.shiftY + 'px';
    
      return false;
    }

    mouseupOnBox() {
        if(this.dragObject.avatar) {
            this.dragObject.avatar.style.zIndex = this.dragObject.previousZIndex;
        }
        this.dragObject = {};
    }

    getCoords(elem) { 
        let box = elem.getBoundingClientRect();
        return {
          top: box.top + pageYOffset,
          left: box.left + pageXOffset
        };
    }

    transferWindowToFooter(collapseWindow) {
        document.getElementsByTagName('footer')[0].appendChild(collapseWindow);
    }

    transferWindowToContainer(maximizeWindow) {
        containerForWindows.appendChild(maximizeWindow); 
    }

    closeSelectedWindow (selectedWindow) {
        selectedWindow.remove();
    }
}

window.onload = () => {
    const app = new App();
    app.run();
}