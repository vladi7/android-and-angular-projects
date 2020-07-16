package com.example.vijaya.androidhardware;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {

    Button button_map,button_photo,button_record,button_storage;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        button_map=(Button)findViewById(R.id.main_btn_map);
        button_photo=(Button)findViewById(R.id.main_btn_photo);
        button_record=(Button)findViewById(R.id.main_btn_record);
        button_storage=(Button)findViewById(R.id.main_btn_storage);
    }
    public void onLocationClick(View v) {
        //This code redirects the from main page to the maps page.

        Intent redirect = new Intent(MainActivity.this, LocationActivity.class);
        startActivity(redirect);
    }
    public void onPhotoClick(View v) {
        //This code redirects to the photo activity.
        Intent redirect = new Intent(MainActivity.this, CameraActivity.class);
        startActivity(redirect);
    }
    public void onAudioClick(View v){
        Intent redirect = new Intent(MainActivity.this, AudioRecordingActivity.class);
        startActivity(redirect);
    }
    public void onStorageClick(View v){
        Intent redirect = new Intent(MainActivity.this, StorageActivity.class);
        startActivity(redirect);
    }
}
