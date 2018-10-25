package com.mol42.sanatografi;

import android.os.Bundle; // here
import com.reactnativenavigation.controllers.SplashActivity;
import org.devio.rn.splashscreen.SplashScreen; // here

 public class MainActivity extends SplashActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);
    }

 }
