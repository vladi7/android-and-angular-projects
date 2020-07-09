package com.example.vijaya.myorder;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class OrderSummary extends AppCompatActivity {
    private Button buttonToMain;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_order_summary);
        // get the text view
        TextView orderSummary = (TextView) findViewById(R.id.orderSummary);
        // get the string from intent
        Intent mainIntent = getIntent();
        String summary = mainIntent.getStringExtra("orderSummary");
        // set text
        orderSummary.setText("\n" +summary);
        // get the button view
        buttonToMain = (Button) findViewById(R.id.btnToMain);
        // come back to main activity
        buttonToMain.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent redirectTo = new Intent(OrderSummary.this, MainActivity.class);
                startActivity(redirectTo);
            }
        });
    }
}