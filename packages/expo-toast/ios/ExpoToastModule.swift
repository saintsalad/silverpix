import ExpoModulesCore
import UIKit

public class ExpoToastModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoToast")
    Function("showToast") { (message: String) -> Void in
      self.showToast(message: message)
    }
  }

  private func showToast(message: String) {
    DispatchQueue.main.async {
      let alert = UIAlertController(title: "Message", message: message, preferredStyle: .alert)
      alert.addAction(UIAlertAction(title: "OK", style: .default))
      UIApplication.shared.keyWindow?.rootViewController?.present(alert, animated: true)
    }
  }
}