import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import Spinner from "../../ui/Spinner";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
function DashboardLayout() {
  const { isLoading: isLoadingBookings, bookings } = useRecentBookings();
  const { isLoading: isLoadingStays, stays, confirmedStays } = useRecentStays();

  if (isLoadingBookings || isLoadingStays) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <div>Statistics</div>
      <div>Today&apos;s Activity</div>
      <div>Chart Stay Durations</div>
      <div>Chart Sales</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
