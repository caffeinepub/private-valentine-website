import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Type
  public type UserProfile = {
    name : Text;
    hasAccess : Bool;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // Password Management
  let correctPassword = "12082006";

  // Required Profile Management Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Password Validation - Open to all (including guests)
  // When password is correct, the user gains access
  // This function is intentionally open to guests to allow initial authentication
  public shared ({ caller }) func validatePassword(input : Text) : async Bool {
    if (input == correctPassword) {
      // Grant user role upon successful password validation
      // Only assign role if caller doesn't already have user permission
      if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
        // For non-admin callers, we need an admin to assign the role
        // Since this is the initial authentication, we'll use the caller itself
        // This is a special case for password-based authentication
        AccessControl.assignRole(accessControlState, caller, caller, #user);
        
        // Create a default profile for the user
        let profile : UserProfile = {
          name = "";
          hasAccess = true;
        };
        userProfiles.add(caller, profile);
      };
      true;
    } else {
      false;
    };
  };

  // Check if caller has validated password (is a user)
  // Open to all callers (including guests) to check their access status
  public query ({ caller }) func hasAccess() : async Bool {
    AccessControl.hasPermission(accessControlState, caller, #user);
  };
};
