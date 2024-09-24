import Float "mo:base/Float";
import Array "mo:base/Array";

actor Calculator {
  public func calculate(stack : [Float]) : async ?Float {
    if (stack.size() < 3) {
      return null; // Not enough operands
    };

    let operand2 = stack[stack.size() - 1];
    let operand1 = stack[stack.size() - 2];
    let operator = stack[stack.size() - 3];

    if (operator == 0) {
      return ?(operand1 + operand2);
    } else if (operator == 1) {
      return ?(operand1 - operand2);
    } else if (operator == 2) {
      return ?(operand1 * operand2);
    } else if (operator == 3) {
      if (operand2 == 0) {
        return null; // Division by zero
      };
      return ?(operand1 / operand2);
    } else {
      return null; // Invalid operator
    };
  };
}
