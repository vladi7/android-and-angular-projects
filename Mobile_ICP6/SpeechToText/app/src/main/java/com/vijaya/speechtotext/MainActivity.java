package com.vijaya.speechtotext;

import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.speech.RecognizerIntent;
import android.speech.tts.TextToSpeech;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ImageButton;
import android.widget.TextView;
import android.speech.tts.TextToSpeech;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Locale;

public class MainActivity extends AppCompatActivity {

    private static final int REQ_CODE_SPEECH_INPUT = 100;
    private TextView mVoiceInputTv;
    private ImageButton mSpeakBtn;
    private TextView tvName;
    // string to speech converter
    private TextToSpeech textSpeaker;
    // name for shared preferences
    private static final String NAME = "name";
    // string of shared preferences
    String PREFS = "mypref";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mVoiceInputTv = (TextView) findViewById(R.id.voiceInput);
        tvName = (TextView) findViewById(R.id.tvName);
        mSpeakBtn = (ImageButton) findViewById(R.id.btnSpeak);
        textSpeaker=new TextToSpeech(getApplicationContext(), new TextToSpeech.OnInitListener() {
            @Override
            public void onInit(int status) {
                if(status != TextToSpeech.ERROR) {
                    // using text to speech to say hello and guide the user
                    textSpeaker.setLanguage(Locale.US);
                    textSpeaker.speak("Hello Dear User. Please say hello if you need my help!", TextToSpeech.QUEUE_FLUSH, null);

                }
            }
        });
        mSpeakBtn.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                startVoiceInput();
            }
        });
    }

    private void startVoiceInput() {
        Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.getDefault());
        intent.putExtra(RecognizerIntent.EXTRA_PROMPT, "Hello, How can I help you?");
        try {
            startActivityForResult(intent, REQ_CODE_SPEECH_INPUT);
        } catch (ActivityNotFoundException a) {

        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        switch (requestCode) {
            case REQ_CODE_SPEECH_INPUT: {
                if (resultCode == RESULT_OK && null != data) {
                    ArrayList<String> result = data.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS);
                    String userVoiceInput = result.get(0);
                    mVoiceInputTv.setText(userVoiceInput);
                    responseHandler(userVoiceInput);
                }
                break;
            }

        }
    }
    // the method to handle the response of the user
    private void responseHandler(String userVoiceInput){
        // converting the input to upper case to make the life easier
        String userInputUpperCase = userVoiceInput.toUpperCase();
        // check whether the user input contains hello and ask for the name
        if(userVoiceInput.equalsIgnoreCase("hello")){
            textSpeaker.speak("Please provide your name", TextToSpeech.QUEUE_FLUSH, null);
        }
        // getting the name and saving it to the shared preferences. Also, displaying it on the front end
        else if(userInputUpperCase.contains("MY NAME IS")){
            int i = userInputUpperCase.indexOf("MY NAME IS");
            String name =  userVoiceInput.substring(i + 10, userVoiceInput.length());
            textSpeaker.speak("Thank you! We have your file now", TextToSpeech.QUEUE_FLUSH, null);
            SharedPreferences preferences;
            SharedPreferences.Editor editor;
            preferences = getSharedPreferences(PREFS,0);
            editor = preferences.edit();
            editor.putString(NAME,name).apply();
            tvName.setText("Your name: " + name);
            editor.commit();
        }
        // if the user input asks about symptoms, tell him that the machine can't help it
        else if(userInputUpperCase.contains("WHAT SHOULD I")){
            textSpeaker.speak("I can understand. Please tell your symptoms in short. I can't help you but listening can heal sometimes!", TextToSpeech.QUEUE_FLUSH, null);
        }
        // After getting assistant, tell that machine is really not a medical assistant, and put the name in the middle of the string
        else if(userInputUpperCase.contains("ASSISTANT")){
            textSpeaker.speak("I can't really assist you, "+getCurrentName()+", but hope you had fun talking with a machine!", TextToSpeech.QUEUE_FLUSH, null);
        }
        //provide the user with the time
        else if(userInputUpperCase.contains("TIME")){
            // time formatter
            SimpleDateFormat sdfDate = new SimpleDateFormat("HH:mm");
            // current date time of the device
            Date now = new Date();
            textSpeaker.speak("The time is " + sdfDate.format(now)+" Hope that helps!", TextToSpeech.QUEUE_FLUSH, null);
        }
        // can't provide the medical advice, but can answer time
        else if(userInputUpperCase.contains("MEDICINE")){
            textSpeaker.speak("I am not a doctor, I am only good in with numbers. Ask me what time it is.", TextToSpeech.QUEUE_FLUSH, null);
        }
    }

    private String getCurrentName(){
        SharedPreferences localPref = getSharedPreferences("mypref", MODE_WORLD_READABLE);;
        String savedName=localPref.getString(NAME, "");
        if (!savedName.isEmpty()){
            return savedName;
        }
            return "Sorry, no name available";
    }
}