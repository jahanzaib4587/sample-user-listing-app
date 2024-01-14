import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom"; // Import useLocation
import axios from "axios";
import { Spin } from "antd";
import "./UserDetails.css"; // Create a CSS file for styling
import MapsComponent from "./MapsComponent";
import ResponsiveCard from "./ResposiveCard";

interface UserDetailsProps {}

interface RouteParams {
  userId: string;
}

const UserDetails: React.FC<UserDetailsProps> = () => {
  const { userId }: RouteParams = useParams<RouteParams>();
  const location = useLocation(); // Use useLocation hook to get location object
  const [userDetails, setUserDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user object is available in location state
    const userFromState = (location.state as { user?: object })?.user;
    if (userFromState) {
      setUserDetails(userFromState);
      setLoading(false);
    } else {
      // If not available, fetch user details from the API
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(
            `https://randomuser.me/api/?seed=${userId}&uuid=${userId}`
          );
          const fetchedUserDetails = response.data.results[0];
          setUserDetails(fetchedUserDetails);
        } catch (error) {
          console.error("Error fetching user details:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserDetails();
    }
  }, [userId, location.state]);

  if (loading) {
    return <Spin />;
  }

  return (
    <div>
      <ResponsiveCard data={userDetails} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
          width: "50%", // Adjust this to your desired width
        }}
      >
        <MapsComponent
          address={`${userDetails.location.street.number} ${userDetails.location.street.name}, ${userDetails.location.city}, ${userDetails.location.state}, ${userDetails.location.country}, ${userDetails.location.postcode}`}
        />
      </div>
    </div>
  );
};

export default UserDetails;
