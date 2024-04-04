interface IUserForm {
    name: string;
    age: number
}

interface IUser extends IUserForm {
    id: number;
}

let isUpdate = false;

class UserService {
    private static readonly _userKey = 'users';
    private static  _updateId:number;


    private static _getAll(): IUser[] {
        return JSON.parse(localStorage.getItem(this._userKey)) || []
    }


    static create(data: IUserForm): void {
        const users = this._getAll();
        const id = users.length ? users.slice(-1)[0].id + 1 : 1;
        users.push({id, ...data})
        this._setToStorage(users)
    }

    static update(data: IUserForm): void {
        const users = this._getAll();
        const index = users.findIndex(user => user.id === this._updateId);
        if (index !== -1) {
            users[index] = {...users[index], ...data};
            this._setToStorage(users);
        }
        isUpdate = false;
        this.showHtml();
    }

    static showHtml(): void {
        const userContainer = document.querySelector('#userContainer') as HTMLDivElement
        userContainer.innerHTML = ''
        const users = this._getAll();
        const saveButton = document.forms['userForm'][2]  as HTMLButtonElement;
        saveButton.innerText = isUpdate ? "update" : "save";

        const usersHtmlContent = users.map(user => {
            const itemDiv = document.createElement('div');
            const button = document.createElement('button');
            button.innerText = 'delete'
            button.onclick = () => {
                this._deleteById(user.id)
            }

            const updateButton = document.createElement('button');
            updateButton.innerText = 'update';
            updateButton.onclick = () => {
                this._updateById(user.id)
                isUpdate = true;
                this.showHtml();
            }

            itemDiv.innerText = `${user.id} -- ${user.name} -- ${user.age}`
            itemDiv.append(button,updateButton);
            return itemDiv
        });

        if (usersHtmlContent.length) {
            userContainer.append(...usersHtmlContent)
        } else {
            userContainer.innerText = 'Users not exists'
        }
    }

    private static _setToStorage(data: IUser[]): void {
        localStorage.setItem(this._userKey, JSON.stringify(data))
        this.showHtml()
    }

    private static _deleteById(id: number): void {
        const users = this._getAll();
        const index = users.findIndex(user => user.id === id);
        users.splice(index, 1)
        this._setToStorage(users)
    }

    private static _updateById(id: number): void {
        const users = this._getAll();
        const index = users.findIndex(user => user.id === id);
        this._updateId = id;
        const user = users.splice(index, 1)[0]  as IUser;
        const nameInput:HTMLInputElement = document.forms['userForm'][0];
        nameInput.value = user.name;
        const ageInput:HTMLInputElement = document.forms['userForm'][1];
        ageInput.value = user.age.toString();
        isUpdate = true;
    }
}

UserService.showHtml()

const form = document.forms['userForm'] as HTMLFormElement;


interface IInput {
    name: HTMLInputElement;
    age: HTMLInputElement;
}

form.onsubmit = (e: SubmitEvent) => {
    e.preventDefault()
    const {name: nameInput, age: ageInput} = form as any as IInput;
    isUpdate?UserService.update({name: nameInput.value, age: +ageInput.value}): UserService.create({name: nameInput.value, age: +ageInput.value});
    form.reset()
}
