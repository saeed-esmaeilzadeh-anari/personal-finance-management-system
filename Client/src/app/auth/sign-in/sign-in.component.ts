import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@Components/animations';
import { FuseAlertType } from '@Components/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'auth-sign-in',
  templateUrl: './sign-in.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class AuthSignInComponent implements OnInit {
  @ViewChild('signInNgForm') signInNgForm: NgForm;

  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: '',
  };
  signInForm: FormGroup;
  showAlert: boolean = false;

  /**
   * Constructor
   */
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Create the form
    this.signInForm = this._formBuilder.group({
      email: [
        'parmaraditya1942@gmail.com',
        [Validators.required, Validators.email],
      ],
      password: ['123456', Validators.required],
      rememberMe: [''],
    });
  }

  /** -----------------------------------------------------------------------------------------------------
   * @public methods
   * -----------------------------------------------------------------------------------------------------
   * Sign in
   */
  signIn(): void {
    // Return if the form is invalid
    if (this.signInForm.invalid) {
      return;
    }

    // Disable the form
    this.signInForm.disable();

    // Hide the alert
    this.showAlert = false;

    // Sign in
    this._authService.signIn(this.signInForm.value).subscribe(
      (response) => {
        // Enable the form
        this.signInForm.enable();

        const redirectURL =
          this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/';

        // Redirect the user
        this._router.navigateByUrl(redirectURL);
      },
      (error) => {
        // Enable the form
        this.signInForm.enable();

        // Show the alert
        this.showAlert = true;

        // Set the alert
        this.alert = {
          type: 'error',
          message: error.message,
        };
      }
    );
  }
}
