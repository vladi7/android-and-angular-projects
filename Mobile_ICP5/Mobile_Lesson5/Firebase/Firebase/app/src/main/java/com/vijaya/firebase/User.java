package com.vijaya.firebase;

/**
 * Created by Vijaya on 11/15/2018.
 */

public class User {
        public String name;
        public String phone;
        // Default constructor required for calls to
        // DataSnapshot.getValue(User.class)
        public User() {
        }

        public User(String name, String phone) {
            this.name = name;
            this.phone = phone;
        }
}