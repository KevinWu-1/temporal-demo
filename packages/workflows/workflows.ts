import { proxyActivities } from "@temporalio/workflow"
import type * as activities from "../activities/activities"

const { verifyOTP } = proxyActivities<typeof activities>({
  startToCloseTimeout: "10 seconds"
})

export async function login(otp: string): Promise<string> {
  console.log("IN login workflow")
  const otp_status = await verifyOTP(otp)

  console.log("otp_status: ", otp_status)
  return otp_status ? "Welcome" : "Try Again"
}
