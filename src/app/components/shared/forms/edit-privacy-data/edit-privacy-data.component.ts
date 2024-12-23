import { Component, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonIconDirective } from '../../../../directives/buttonIcon/button-icon.directive';
import { ButtonStyleDirective } from '../../../../directives/buttonStyle/button-style.directive';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserState } from '../../../../core/states/User/user.state';
import { UserFacade } from '../../../../facades/user/user.facade';

@Component({
    selector: 'app-edit-privacy-data',
    imports: [RouterLink, ButtonIconDirective, ButtonStyleDirective, ReactiveFormsModule],
    templateUrl: './edit-privacy-data.component.html',
    styleUrl: './edit-privacy-data.component.scss'
})
export class EditPrivacyDataComponent {

    protected privacyDataForm: FormGroup;
    private userState = inject(UserState);
    private userFacade = inject(UserFacade);
    protected spans = [];
    protected passwordIsVisible = false;

    constructor(formBuilder: FormBuilder) {
        this.privacyDataForm = formBuilder.group({
            email: [],
            password: []
        })

        effect(() => {
            this.privacyDataForm.get("email").setValue(this.userState.userSignal().email)
        })
    }

    protected updatePrivacyData() {

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
        const [email, password] = ["email", "password"].map((el, index) => {
            const value = this.privacyDataForm.get(el).value

            //email
            if (index == 0) {
                if (emailRegex.test(value)) {
                    this.spans[index] = false;
                } else {
                    this.spans[index] = true;
                }
            }

            //password
            if (index == 1) {
                if (passwordRegex.test(value)) {
                    this.spans[index] = false;
                } else {
                    this.spans[index] = true;
                }
            }
            return value
        });

        if (this.spans.includes(true) == false) {
            this.userState.userSignal.update(user => {
                user.email = email
                user.password = password
                return user
            })
    
            this.userFacade.updateUser(this.userState.userSignal())
        }
    }
}
