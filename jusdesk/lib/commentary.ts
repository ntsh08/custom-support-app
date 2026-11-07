/** Presenter's commentary for each case, shown on the floating sheet. Order follows the case ladder: simple to hard. */
export const COMMENTARY: Record<string, { n: number; title: string; happening: string; shows: string }> = {
  vikram: {
    n: 1,
    title: "AI handles it end to end",
    happening: "Delhivery left the tee with his society guard. Vikram wrote in Hindi. The AI found the courier's note and photo, replied in Hindi, and closed the ticket when he confirmed.",
    shows: "The AI solving a case alone, end to end, in the customer's language. A person only sees the summary.",
  },
  kavya: {
    n: 2,
    title: "Waiting on the courier",
    happening: "Ekart scanned the kurta as delivered while the rider was still 4.2 km away. The AI explained the early scan, asked Ekart to confirm, and assigned it to you because it can't call the rider.",
    shows: "Waiting on a third party with a deadline. The ticket stays open, and the AI hands over the one step it can't do.",
  },
  ananya: {
    n: 3,
    title: "Evidence points to the wrong flat",
    happening: "The courier's photo shows a green door; her last delivery went to a white door, and the GPS was 600 m off. She wrote twice, on chat and email, and needs it by Saturday.",
    shows: "Evidence deciding the case (likely wrong flat, so reship and claim), two channels merged into one ticket, and the AI suggesting next steps you can turn into tasks.",
  },
  rohan: {
    title: "Refund needs the team lead",
    n: 4,
    happening: "No OTP, no photo, GPS 1.1 km off. He wants a replacement but size L is out of stock, and a ₹6,500 refund needs Priya's approval. The AI didn't reply.",
    shows: "Policy limits on the AI: it investigates, stays silent when it can't answer, and routes money above ₹5,000 to the team lead.",
  },
  meera: {
    n: 5,
    title: "Possible fraud, handled fairly",
    happening: "The OTP was entered at her door and the photo matches her flat, yet this is her 3rd claim in 2 months, and another account at her address has claimed too.",
    shows: "Possible fraud handled fairly: private risk signals with sources, no accusation, no denial. The team lead decides.",
  },
};
