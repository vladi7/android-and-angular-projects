package com.example.mobile_icp1;

import androidx.appcompat.app.AppCompatActivity;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;


//main activity for login page
public class MainActivity extends AppCompatActivity {
    //class variables to put the references from front end somewhere
    private EditText userName;
    private EditText password;
    private Button loginButton;
    private TextView failedMessage;
    private int i = 3;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        // getting username
        userName = (EditText)findViewById(R.id.userNamePT);
        //getting password
        password = (EditText)findViewById(R.id.PasswordPT);
        //getting login button
        loginButton = (Button) findViewById(R.id.LoginButton);
        //getting failing message
        failedMessage = (TextView)findViewById(R.id.failedMessage);

        //listener for login button
        loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                validateLoginPassword(userName.getText().toString(), password.getText().toString());
            }
        });
    }
    // method to check whether login and password are valid
    private void validateLoginPassword(String userName, String password){
        //actual check
        if(userName.equals("Vladi") && password.equals("00000")){
            //redirecting to another page if true
            Intent redirect = new Intent(MainActivity.this, MainScreenActivity.class);
            startActivity(redirect);
        }
        else{
            //decrease the counter for attempts left
            i--;
            //showing the warning dialog
            AlertDialog.Builder alert  = new AlertDialog.Builder(this);

            alert.setMessage("Wrong Login Credentials! " + i +" attempts left");
            alert.setTitle("WRONG LOGIN/PASSWORD");
            alert.setPositiveButton("OK", null);
            alert.setCancelable(true);
            alert.create().show();

            alert.setPositiveButton("Ok",
                    new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int which) {

                        }
                    });
            // if no attempts left
            if(i == 0) {
                //show the red failure message
                failedMessage.setVisibility(View.VISIBLE);
                //login button is set to disabled.
                loginButton.setEnabled(false);
            }
        }
    }
}