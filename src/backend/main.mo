import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import Migration "migration";

(with migration = Migration.run)
actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Type
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // Password Management
  let correctPassword = "12082006";
  
  // Track principals that have validated the password
  // This is separate from the role system to avoid authorization issues
  let validatedPrincipals = Map.empty<Principal, Bool>();

  // Profile Management Functions
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
  // Does not attempt role assignment to avoid authorization trap
  public shared ({ caller }) func validatePassword(input : Text) : async Bool {
    if (input == correctPassword) {
      validatedPrincipals.add(caller, true);
      true;
    } else {
      false;
    };
  };

  // Check if caller has validated password
  // Open to all - returns access status based on password validation
  public query ({ caller }) func hasAccess() : async Bool {
    switch (validatedPrincipals.get(caller)) {
      case (?validated) { validated };
      case null { false };
    };
  };

  // Admin function to grant user role to principals who validated password
  // This separates password validation from role assignment
  public shared ({ caller }) func promoteValidatedUser(user : Principal) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can promote users");
    };
    
    switch (validatedPrincipals.get(user)) {
      case (?true) {
        AccessControl.assignRole(accessControlState, caller, user, #user);
      };
      case _ {
        Runtime.trap("User has not validated password");
      };
    };
  };
};

