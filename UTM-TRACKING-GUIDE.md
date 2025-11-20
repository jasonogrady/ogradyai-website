# UTM Tracking Guide for Portfolio

Use these UTM parameters when sharing your portfolio to track where visitors come from.

## Base Portfolio URL
```
https://ogrady.ai/portfolio/
```

## UTM Parameter Template
```
https://ogrady.ai/portfolio/?utm_source=[SOURCE]&utm_medium=[MEDIUM]&utm_campaign=[CAMPAIGN]
```

## Common Use Cases

### LinkedIn Profile
```
https://ogrady.ai/portfolio/?utm_source=linkedin&utm_medium=profile&utm_campaign=job_search
```

### LinkedIn Post
```
https://ogrady.ai/portfolio/?utm_source=linkedin&utm_medium=post&utm_campaign=portfolio_launch
```

### Resume PDF
```
https://ogrady.ai/portfolio/?utm_source=resume&utm_medium=pdf&utm_campaign=job_application
```

### Email Signature
```
https://ogrady.ai/portfolio/?utm_source=email&utm_medium=signature&utm_campaign=outreach
```

### Bluesky Profile
```
https://ogrady.ai/portfolio/?utm_source=bluesky&utm_medium=profile&utm_campaign=social_presence
```

### Job Application
```
https://ogrady.ai/portfolio/?utm_source=job_application&utm_medium=cover_letter&utm_campaign=google_2024
```

### Networking Event
```
https://ogrady.ai/portfolio/?utm_source=networking&utm_medium=business_card&utm_campaign=tech_meetup
```

### Cold Outreach Email
```
https://ogrady.ai/portfolio/?utm_source=cold_email&utm_medium=email&utm_campaign=hiring_manager&utm_content=tech_writer_role
```

### GitHub Profile
```
https://ogrady.ai/portfolio/?utm_source=github&utm_medium=profile&utm_campaign=developer_community
```

### Twitter/X Post
```
https://ogrady.ai/portfolio/?utm_source=twitter&utm_medium=post&utm_campaign=portfolio_announcement
```

## UTM Parameters Explained

- **utm_source**: Where the traffic came from (linkedin, resume, email, etc.)
- **utm_medium**: The marketing medium (profile, post, pdf, signature, etc.)
- **utm_campaign**: The specific campaign or goal (job_search, portfolio_launch, etc.)
- **utm_term**: (Optional) Paid search keywords
- **utm_content**: (Optional) To differentiate similar content/links

## How to Track in GA4

1. Go to **GA4 > Reports > Acquisition > Traffic acquisition**
2. Add secondary dimension: **Session source / medium**
3. Filter by `/portfolio/` page
4. See exactly which links drove traffic

Or use the custom exploration:
1. **Explore > Create new exploration**
2. Add dimensions: `utm_source`, `utm_medium`, `utm_campaign`
3. Add metrics: `Sessions`, `Engaged sessions`, `Event count`
4. See detailed breakdown of all traffic sources

## Pro Tips

✅ **Always use lowercase** in UTM parameters
✅ **Be consistent** with naming (don't mix "linkedin" and "LinkedIn")
✅ **Use underscores** instead of spaces (job_search, not "job search")
✅ **Keep it simple** - use clear, readable values
✅ **Test your links** before sharing to ensure UTM parameters are captured

## Quick Link Generator

Use this tool to generate UTM links:
https://ga-dev-tools.google/campaign-url-builder/

**Settings:**
- Website URL: `https://ogrady.ai/portfolio/`
- Campaign Source: (where you're sharing it)
- Campaign Medium: (type of link)
- Campaign Name: (your goal/campaign)

## Example Tracking Scenarios

### Scenario 1: Job Application
```
Link in cover letter:
https://ogrady.ai/portfolio/?utm_source=google&utm_medium=application&utm_campaign=senior_tech_writer_role

What you'll see in GA4:
- Source: google
- Medium: application
- Campaign: senior_tech_writer_role
- You'll know the hiring manager viewed your portfolio!
```

### Scenario 2: LinkedIn Outreach
```
DM to recruiter:
https://ogrady.ai/portfolio/?utm_source=linkedin&utm_medium=dm&utm_campaign=recruiter_outreach&utm_content=jane_smith

What you'll see in GA4:
- Source: linkedin
- Medium: dm
- Campaign: recruiter_outreach
- Content: jane_smith
- Track which recruiters are viewing!
```

### Scenario 3: Resume on Job Board
```
Resume uploaded to Indeed:
https://ogrady.ai/portfolio/?utm_source=indeed&utm_medium=resume&utm_campaign=active_job_search

What you'll see in GA4:
- Source: indeed
- Medium: resume
- Campaign: active_job_search
- Track job board effectiveness!
```

## Recommended GA4 Report Setup

Create a custom report:

**Name:** "Portfolio Traffic Sources"

**Dimensions:**
- utm_source
- utm_medium
- utm_campaign

**Metrics:**
- Sessions
- Engaged sessions
- Average engagement time
- Event count (link_click)
- Event count (contact_intent_click)

**Filters:**
- Page path contains: /portfolio/

This shows you exactly which shared links are driving the most engaged traffic!
