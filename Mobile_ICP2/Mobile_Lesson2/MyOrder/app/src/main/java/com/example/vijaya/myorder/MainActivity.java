package com.example.vijaya.myorder;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {
    private static final String MAIN_ACTIVITY_TAG = "MainActivity";
    final int COFFEE_PRICE = 5;
    final int WHIPPED_CREAM_PRICE = 1;
    final int CHOCOLATE_PRICE = 2;
    final int CINNAMON_PRICE = 1;
    final int MILK_PRICE = 1;
    private Button orderButton;
    private Button summaryButton;
    private RadioButton rSendEmail;
    int quantity = 1;
    Boolean rButton = false;
    String orderSummaryMessage="";
    String userInputName="";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        // getting buttons
        orderButton = (Button) findViewById(R.id.btnOrder);
        summaryButton = (Button) findViewById(R.id.btnSummary);
        rSendEmail = (RadioButton) findViewById(R.id.rSendEmail);
        summaryButton.setEnabled(false);
        // handling buttons
        orderButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                submitOrder(v);
            }
        });
        summaryButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //redirect to another view
                Intent redirectTo = new Intent(MainActivity.this, OrderSummary.class);
                redirectTo.putExtra("orderSummary", orderSummaryMessage);
                startActivity(redirectTo);
            }
        });
        rSendEmail.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
            // check/uncheck radio button
            if(rButton){
                    rSendEmail.setChecked(false);
                    rButton = false;
                    System.out.println("1");
                }
                else{
                    rSendEmail.setChecked(true);
                    rButton = true;
                    System.out.println("2");
                }

            }

        });
    }

    /**
     * This method is called when the order button is clicked.
     */

    public void submitOrder(View view) {

        // get user input
        EditText userInputNameView = (EditText) findViewById(R.id.user_input);
        EditText email_inputView = (EditText) findViewById(R.id.email_input);
        userInputName = userInputNameView.getText().toString();
        String email_input = email_inputView.getText().toString();

        // check if whipped cream is selected
        CheckBox whippedCream = (CheckBox) findViewById(R.id.whipped_cream_checked);
        boolean hasWhippedCream = whippedCream.isChecked();

        // check if chocolate is selected
        CheckBox chocolate = (CheckBox) findViewById(R.id.chocolate_checked);
        boolean hasChocolate = chocolate.isChecked();

        CheckBox milk = (CheckBox) findViewById(R.id.milk_checked);
        boolean hasMilk = milk.isChecked();

        CheckBox cinnamon = (CheckBox) findViewById(R.id.cinnamon_checked);
        boolean hasCinnamon = cinnamon.isChecked();


        // calculate and store the total price
        float totalPrice = calculatePrice(hasWhippedCream, hasChocolate,hasMilk, hasCinnamon);

        // create and store the order summary
        orderSummaryMessage = createOrderSummary(userInputName, hasWhippedCream, hasChocolate, hasMilk, hasCinnamon, totalPrice);
        System.out.println(orderSummaryMessage);
        //enabling the summary button
        summaryButton.setEnabled(true);
        //sending the email
        if(rButton && !email_input.equals("")){
        sendEmail( userInputName,  orderSummaryMessage,  email_input);
        }
    }

    public void sendEmail(String name, String output, String email) {
        // https://stackoverflow.com/questions/2197741/how-to-send-emails-from-my-android-application
        Intent i = new Intent(Intent.ACTION_SEND);
        i.setType("message/rfc822");
        i.putExtra(Intent.EXTRA_EMAIL  , new String[]{email});
        i.putExtra(Intent.EXTRA_SUBJECT, "Your Coffee Order");
        i.putExtra(Intent.EXTRA_TEXT   , "Dear " + name + "\n" + "Your order is as follows: "+ "\n" + output);
        try {
            startActivity(Intent.createChooser(i, "Send mail..."));
        } catch (android.content.ActivityNotFoundException ex) {
            Toast.makeText(MainActivity.this, "There are no email clients installed.", Toast.LENGTH_SHORT).show();
        }
    }

    private String boolToString(boolean bool) {
        return bool ? (getString(R.string.yes)) : (getString(R.string.no));
    }

    private String createOrderSummary(String userInputName, boolean hasWhippedCream, boolean hasChocolate,boolean hasMilk,boolean hasCinnamon, float price) {
        String orderSummaryMessage = getString(R.string.order_summary_name, userInputName) + "\n" +
                getString(R.string.order_summary_whipped_cream, boolToString(hasWhippedCream)) + "\n" +
                getString(R.string.order_summary_chocolate, boolToString(hasChocolate)) + "\n" +
                getString(R.string.order_summary_milk, boolToString(hasMilk)) + "\n" +
                getString(R.string.order_summary_cinnamon, boolToString(hasCinnamon)) + "\n" +
                getString(R.string.order_summary_quantity, quantity) + "\n" +
                getString(R.string.order_summary_total_price, price) + "\n" +
                getString(R.string.thank_you);


        return orderSummaryMessage;
    }

    /**
     * Method to calculate the total price
     *
     * @return total Price
     */
    private float calculatePrice(boolean hasWhippedCream, boolean hasChocolate, boolean hasMilk, boolean hasCinnamon) {
        int basePrice = COFFEE_PRICE;
        if (hasWhippedCream) {
            basePrice += WHIPPED_CREAM_PRICE;
        }
        if (hasChocolate) {
            basePrice += CHOCOLATE_PRICE;
        }
        if (hasMilk) {
            basePrice += MILK_PRICE;
        }
        if (hasCinnamon) {
            basePrice += CINNAMON_PRICE;
        }
        return quantity * basePrice;
    }

    /**
     * This method displays the given quantity value on the screen.
     */
    private void display(int number) {
        TextView quantityTextView = (TextView) findViewById(R.id.quantity_text_view);
        quantityTextView.setText("" + number);
    }

    /**
     * This method increments the quantity of coffee cups by one
     *
     * @param view on passes the view that we are working with to the method
     */

    public void increment(View view) {
        if (quantity < 100) {
            quantity = quantity + 1;
            display(quantity);
        } else {
            Log.i("MainActivity", "Please select less than one hundred cups of coffee");
            Context context = getApplicationContext();
            String lowerLimitToast = getString(R.string.too_much_coffee);
            int duration = Toast.LENGTH_SHORT;
            Toast toast = Toast.makeText(context, lowerLimitToast, duration);
            toast.show();
            return;
        }
    }

    /**
     * This method decrements the quantity of coffee cups by one
     *
     * @param view passes on the view that we are working with to the method
     */
    public void decrement(View view) {
        if (quantity > 1) {
            quantity = quantity - 1;
            display(quantity);
        } else {
            Log.i("MainActivity", "Please select atleast one cup of coffee");
            Context context = getApplicationContext();
            String upperLimitToast = getString(R.string.too_little_coffee);
            int duration = Toast.LENGTH_SHORT;
            Toast toast = Toast.makeText(context, upperLimitToast, duration);
            toast.show();
            return;
        }
    }
}