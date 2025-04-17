import ExpoModulesCore
import Photos

public class NativeFunctionModule: Module {

  public func definition() -> ModuleDefinition {
    Name("NativeFunction")
    Function("showToast") { (message: String) -> Void in
      self.showToast(message: message)
    }

    AsyncFunction("likePhoto") { (imageId: String, promise: Promise) in
        // Request authorization to access the photo library
        PHPhotoLibrary.requestAuthorization { status in
          guard status == .authorized else {
            promise.reject("PHOTOS_ACCESS_DENIED", "User denied access to photos")
            return
          }

          // Perform changes on the photo library
          PHPhotoLibrary.shared().performChanges({
            // Fetch the asset using the local identifier
            let fetchResult = PHAsset.fetchAssets(withLocalIdentifiers: [imageId], options: nil)
            guard let asset = fetchResult.firstObject else {
              promise.reject("ASSET_NOT_FOUND", "Photo with ID \(imageId) not found")
              return
            }

            // Mark the asset as favorite
            let request = PHAssetChangeRequest(for: asset)
            request.isFavorite = true
          }, completionHandler: { success, error in
            if success {
              promise.resolve("Photo liked successfully")
            } else if let error = error {
              promise.reject("LIKE_FAILED", "Failed to like photo: \(error.localizedDescription)")
            }
          })
        }
      }
      
    AsyncFunction("isPhotoFavorite") { (imageId: String, promise: Promise) in
      PHPhotoLibrary.requestAuthorization { status in
        guard status == .authorized else {
          promise.reject("PHOTOS_ACCESS_DENIED", "User denied access to photos")
          return
        }
        
        // Fetch the asset using the local identifier
        let fetchResult = PHAsset.fetchAssets(withLocalIdentifiers: [imageId], options: nil)
        guard let asset = fetchResult.firstObject else {
          promise.reject("ASSET_NOT_FOUND", "Photo with ID \(imageId) not found")
          return
        }
        
        // Return the isFavorite status
        promise.resolve(asset.isFavorite)
      }
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
