import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor DBank {
    stable var currentValue: Float = 300;
    // currentValue := 100;
    stable var startTime = Time.now();

    // Debug.print("Hello");
    // Debug.print(debug_show(currentValue));

    public func topUp(amt: Float) {
        currentValue += amt;
        Debug.print(debug_show(currentValue));
    };

    public func withdraw(amt: Float) {
        let remain: Float = currentValue - amt;
        if (remain >= 0) {
            currentValue -= amt;
            Debug.print(debug_show(currentValue));
        } else {
            Debug.print("Amount too large.");
        }
    };

    public query func checkBalance(): async Float {
        return currentValue;
    };

    public func compound() {
        let currentTime = Time.now();
        let timeElapsed = (currentTime - startTime) / 1000000000;
        currentValue := currentValue * (1.01 ** Float.fromInt(timeElapsed));
        startTime := currentTime;
    }

    // topUp();
}