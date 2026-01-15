import Map "mo:core/Map";
import Principal "mo:core/Principal";

module {
  // Old UserProfile type
  type OldUserProfile = {
    name : Text;
    hasAccess : Bool;
  };

  // New UserProfile type (unchanged)
  type NewUserProfile = {
    name : Text;
  };

  // Old actor state
  type OldActor = {
    userProfiles : Map.Map<Principal, OldUserProfile>;
  };

  // New actor state with validated principals tracking
  type NewActor = {
    userProfiles : Map.Map<Principal, NewUserProfile>;
    validatedPrincipals : Map.Map<Principal, Bool>;
  };

  // Migration function
  public func run(old : OldActor) : NewActor {
    let newProfiles = old.userProfiles.map<Principal, OldUserProfile, NewUserProfile>(
      func(_principal, oldProfile) {
        { name = oldProfile.name };
      }
    );
    
    // Initialize empty validated principals map
    let validatedPrincipals = Map.empty<Principal, Bool>();
    
    {
      userProfiles = newProfiles;
      validatedPrincipals = validatedPrincipals;
    };
  };
};
