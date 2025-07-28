"use client";
import React, { useRef } from "react";

const sections = [
  {
    id: "services",
    title: "The services we provide",
  },
  {
    id: "funding",
    title: "How our services are funded",
  },
  {
    id: "commitments",
    title: "Your commitments to Facebook and our community",
  },
  {
    id: "provisions",
    title: "Additional provisions",
  },
  {
    id: "other",
    title: "Other terms and policies that may apply to you",
  },
];

export default function TermsPage() {
  // Refs for each section
  const refs = {
    services: useRef<HTMLDivElement>(null),
    funding: useRef<HTMLDivElement>(null),
    commitments: useRef<HTMLDivElement>(null),
    provisions: useRef<HTMLDivElement>(null),
    other: useRef<HTMLDivElement>(null),
  };

  // Scroll to section
  const handleScroll = (id: keyof typeof refs) => {
    refs[id].current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-row justify-center">
      {/* Main Content */}
      <div className="w-full sm:w-3.5/5 px-4 sm:px-6 pt-20 sm:pt-28 sm:pl-32 sm:pr-8 text-justify">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-left sm:text-justify">Terms of Service</h1>
        <p className="text-lg text-gray-700 mb-6">Welcome to Facebook!</p>
        <p className="text-base text-gray-700 mb-6">
          Facebook builds technologies and services that enable people to connect with each other, build communities, and grow businesses. These Terms govern your use of Facebook, Messenger, and the other products, features, apps, services, technologies, and software we offer (the Facebook Products or Products), except where we expressly state that separate terms (and not these) apply. These Products are provided to you by Facebook, Inc.<br /><br />
          We don’t charge you to use Facebook or the other products and services covered by these Terms. Instead, businesses and organizations pay us to show you ads for their products and services. By using our Products, you agree that we can show you ads that we think will be relevant to you and your interests. We use your personal data to help determine which ads to show you.<br /><br />
          We don’t sell your personal data to advertisers, and we don’t share information that directly identifies you (such as your name, email address or other contact information) with advertisers unless you give us specific permission. Instead, advertisers can tell us things like the kind of audience they want to see their ads, and we show those ads to people who may be interested. We provide advertisers with reports about the performance of their ads that help them understand how people are interacting with their content. See Section 2 below to learn more.<br /><br />
          Our Data Policy explains how we collect and use your personal data to determine some of the ads you see and provide all of the other services described below. You can also go to your settings at any time to review the privacy choices you have about how we use your data.
        </p>

        {/* Section 1 */}
        <div ref={refs.services} id="services" className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">1. The services we provide</h2>
          <p className="text-base text-gray-700 mb-4">
            Our mission is to give people the power to build community and bring the world closer together. To help advance this mission, we provide the Products and services described below to you:<br /><br />
            Provide a personalized experience for you:<br />
            Your experience on Facebook is unlike anyone else's: from the posts, stories, events, ads, and other content you see in News Feed or our video platform to the Pages you follow and other features you might use, such as Trending, Marketplace, and search. We use the data we have - for example, about the connections you make, the choices and settings you select, and what you share and do on and off our Products - to personalize your experience.<br /><br />
            Connect you with people and organizations you care about:<br />
            We help you find and connect with people, groups, businesses, organizations, and others that matter to you across the Facebook Products you use. We use the data we have to make suggestions for you and others - for example, groups to join, events to attend, Pages to follow or send a message to, shows to watch, and people you may want to become friends with. Stronger ties make for better communities, and we believe our services are most useful when people are connected to people, groups, and organizations they care about.<br /><br />
            Empower you to express yourself and communicate about what matters to you:<br />
            There are many ways to express yourself on Facebook and to communicate with friends, family, and others about what matters to you - for example, sharing status updates, photos, videos, and stories across the Facebook Products you use, sending messages to a friend or several people, creating events or groups, or adding content to your profile. We have also developed, and continue to explore, new ways for people to use technology, such as augmented reality and 360 video to create and share more expressive and engaging content on Facebook.<br /><br />
            Help you discover content, products, and services that may interest you:<br />
            We show you ads, offers, and other sponsored content to help you discover content, products, and services that are offered by the many businesses and organizations that use Facebook and other Facebook Products. Section 2 below explains this in more detail.<br /><br />
            Combat harmful conduct and protect and support our community:<br />
            People will only build community on Facebook if they feel safe. We employ dedicated teams around the world and develop advanced technical systems to detect misuse of our Products, harmful conduct towards others, and situations where we may be able to help support or protect our community. If we learn of content or conduct like this, we will take appropriate action - for example, offering help, removing content, removing or restricting access to certain features, disabling an account, or contacting law enforcement. We share data with other Facebook Companies when we detect misuse or harmful conduct by someone using one of our Products.<br /><br />
            Use and develop advanced technologies to provide safe and functional services for everyone:<br />
            We use and develop advanced technologies - such as artificial intelligence, machine learning systems, and augmented reality - so that people can use our Products safely regardless of physical ability or geographic location. For example, technology like this helps people who have visual impairments understand what or who is in photos or videos shared on Facebook or Instagram. We also build sophisticated network and communication technology to help more people connect to the internet in areas with limited access. And we develop automated systems to improve our ability to detect and remove abusive and dangerous activity that may harm our community and the integrity of our Products.<br /><br />
            Research ways to make our services better:<br />
            We engage in research to develop, test, and improve our Products. This includes analyzing the data we have about our users and understanding how people use our Products, for example by conducting surveys and testing and troubleshooting new features. Our Data Policy explains how we use data to support this research for the purposes of developing and improving our services.<br /><br />
            Provide consistent and seamless experiences across the Facebook Company Products:<br />
            Our Products help you find and connect with people, groups, businesses, organizations, and others that are important to you. We design our systems so that your experience is consistent and seamless across the different Facebook Company Products that you use. For example, we use data about the people you engage with on Facebook to make it easier for you to connect with them on Instagram or Messenger, and we enable you to communicate with a business you follow on Facebook through Messenger.<br /><br />
            Enable global access to our services:<br />
            To operate our global service, we need to store and distribute content and data in our data centers and systems around the world, including outside your country of residence. This infrastructure may be operated or controlled by Facebook, Inc., Facebook Ireland Limited, or its affiliates.
          </p>
        </div>

        {/* Section 2 */}
        <div ref={refs.funding} id="funding" className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">2. How our services are funded</h2>
          <p className="text-base text-gray-700 mb-4">
            Instead of paying to use Facebook and the other products and services we offer, by using the Facebook Products covered by these Terms, you agree that we can show you ads that businesses and organizations pay us to promote on and off the Facebook Company Products. We use your personal data, such as information about your activity and interests, to show you ads that are more relevant to you.<br /><br />
            Protecting people's privacy is central to how we've designed our ad system. This means that we can show you relevant and useful ads without telling advertisers who you are. We don't sell your personal data. We allow advertisers to tell us things like their business goal, and the kind of audience they want to see their ads (for example, people between the age of 18-35 who like cycling). We then show their ad to people who might be interested.<br /><br />
            We also provide advertisers with reports about the performance of their ads to help them understand how people are interacting with their content on and off Facebook. For example, we provide general demographic and interest information to advertisers (for example, that an ad was seen by a woman between the ages of 25 and 34 who lives in Madrid and likes software engineering) to help them better understand their audience. We don’t share information that directly identifies you (information such as your name or email address that by itself can be used to contact you or identifies who you are) unless you give us specific permission. <a href="#" className="text-[#01DAE3] hover:text-[#01DAE3]/70 font-semibold transition-colors">Learn more</a> about how Facebook ads work here.<br /><br />
            We collect and use your personal data in order to provide the services described above to you. You can learn about how we collect and use your data in our Data Policy. You have controls over the types of ads and advertisers you see, and the types of information we use to determine which ads we show you. <a href="#" className="text-[#01DAE3] hover:text-[#01DAE3]/70 font-semibold transition-colors">Learn more</a>.
          </p>
        </div>
        
        {/* Section 3 */}
        <div ref={refs.commitments} id="commitments" className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Your commitments to Facebook and our community</h2>
          <p className="text-base text-gray-700 mb-4">
            Instead of paying to use Facebook and the other products and services we offer, by using the Facebook Products covered by these Terms, you agree that we can show you ads that businesses and organizations pay us to promote on and off the Facebook Company Products. We use your personal data, such as information about your activity and interests, to show you ads that are more relevant to you.<br /><br />
            Protecting people's privacy is central to how we've designed our ad system. This means that we can show you relevant and useful ads without telling advertisers who you are. We don't sell your personal data. We allow advertisers to tell us things like their business goal, and the kind of audience they want to see their ads (for example, people between the age of 18-35 who like cycling). We then show their ad to people who might be interested.<br /><br />
            We also provide advertisers with reports about the performance of their ads to help them understand how people are interacting with their content on and off Facebook. For example, we provide general demographic and interest information to advertisers (for example, that an ad was seen by a woman between the ages of 25 and 34 who lives in Madrid and likes software engineering) to help them better understand their audience. We don’t share information that directly identifies you (information such as your name or email address that by itself can be used to contact you or identifies who you are) unless you give us specific permission. <a href="#" className="text-[#01DAE3] hover:text-[#01DAE3]/70 font-semibold transition-colors">Learn more</a> about how Facebook ads work here.<br /><br />
            We collect and use your personal data in order to provide the services described above to you. You can learn about how we collect and use your data in our Data Policy. You have controls over the types of ads and advertisers you see, and the types of information we use to determine which ads we show you. <a href="#" className="text-[#01DAE3] hover:text-[#01DAE3]/70 font-semibold transition-colors">Learn more</a>.
          </p>
        </div>

        {/* Section 4 */}
        <div ref={refs.provisions} id="provisions" className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Additional provisions</h2>
          <p className="text-base text-gray-700 mb-4">
            <span className="font-semibold text-[#01DAE3]">1. Who can use Facebook</span><br /><br />
            When people stand behind their opinions and actions, our community is safer and more accountable. For this reason, you must:<br />
            Use the same name that you use in everyday life.<br />
            Provide accurate information about yourself.<br />
            Create only one account (your own) and use your timeline for personal purposes.<br />
            Not share your password, give access to your Facebook account to others, or transfer your account to anyone else (without our permission).<br /><br />
            We try to make Facebook broadly available to everyone, but you cannot use Facebook if:<br />
            You are under 13 years old (or the minimum legal age in your country to use our Products).<br />
            You are a convicted sex offender.<br />
            We've previously disabled your account for violations of our Terms or Policies.<br />
            You are prohibited from receiving our products, services, or software under applicable laws.<br /><br />
            
            <span className="font-semibold text-[#01DAE3]">2. Account suspension or termination</span><br /><br />
            We want Facebook to be a place where people feel welcome and safe to express themselves and share their thoughts and ideas.<br />
            If we determine that you have clearly, seriously or repeatedly breached our Terms or Policies, including in particular our Community Standards, we may suspend or permanently disable access to your account. We may also suspend or disable your account if you repeatedly infringe other people’s intellectual property rights or where we are required to do so for legal reasons.<br /><br />
            Where we take such action we’ll let you know and explain any options you have to request a review, unless doing so may expose us or others to legal liability; harm our community of users; compromise or interfere with the integrity or operation of any of our services, systems or Products; or where we are restricted due to technical limitations; or where we are prohibited from doing so for legal reasons.<br /><br />
            You can learn more about what you can do if your account has been disabled and how to contact us if you think we have disabled your account by mistake.<br />
            If you delete or we disable your account, these Terms shall terminate as an agreement between you and us, but the following provisions will remain in place: 3, 4.2-4.5.<br /><br />

            <span className="font-semibold text-[#01DAE3]">3. Limits on liability</span><br /><br />
            We want Facebook to be a place where people feel welcome and safe to express themselves and share their thoughts and ideas.<br />
            If we determine that you have clearly, seriously or repeatedly breached our Terms or Policies, including in particular our Community Standards, we may suspend or permanently disable access to your account. We may also suspend or disable your account if you repeatedly infringe other people’s intellectual property rights or where we are required to do so for legal reasons.<br /><br />
            Where we take such action we’ll let you know and explain any options you have to request a review, unless doing so may expose us or others to legal liability; harm our community of users; compromise or interfere with the integrity or operation of any of our services, systems or Products; or where we are restricted due to technical limitations; or where we are prohibited from doing so for legal reasons.<br /><br />
            You can learn more about what you can do if your account has been disabled and how to contact us if you think we have disabled your account by mistake.<br />
            If you delete or we disable your account, these Terms shall terminate as an agreement between you and us, but the following provisions will remain in place: 3, 4.2-4.5.<br /><br />

            <span className="font-semibold text-[#01DAE3]">4. Disputes</span><br /><br />
            We try to provide clear rules so that we can limit or hopefully avoid disputes between you and us. If a dispute does arise, however, it's useful to know up front where it can be resolved and what laws will apply.<br />
            If you are a consumer, the laws of the country in which you reside will apply to any claim, cause of action, or dispute you have against us that arises out of or relates to these Terms or the Facebook Products, and you may resolve your claim in any competent court in that country that has jurisdiction over the claim. In all other cases, you agree that the claim must be resolved exclusively in the U.S. District Court for the Northern District of California or a state court located in San Mateo County. You also agree that you submit to the personal jurisdiction of either of these courts for the purpose of litigating any such claim, and that the laws of the State of California will govern these Terms and any claim, without regard to conflict of law provisions.<br /><br />

            <span className="font-semibold text-[#01DAE3]">5. Other</span><br /><br />
            These Terms (formerly known as the Statement of Rights and Responsibilities) make up the entire agreement between you and Facebook, Inc. regarding your use of our Products. They supersede any prior agreements.<br />
            Some of the Products we offer are also governed by supplemental terms. If you use any of those Products, supplemental terms will be made available and will become part of our agreement with you. For instance, if you access or use our Products for commercial or business purposes, such as buying ads, selling products, developing apps, managing a group or Page for your business, or using our measurement services, you must agree to our Commercial Terms. If you post or share content containing music, you must comply with our Music Guidelines. To the extent any supplemental terms conflict with these Terms, the supplemental terms shall govern to the extent of the conflict.<br /><br />
            If any portion of these Terms is found to be unenforceable, the remaining portion will remain in full force and effect. If we fail to enforce any of these Terms, it will not be considered a waiver. Any amendment to or waiver of these Terms must be made in writing and signed by us.<br />
            You will not transfer any of your rights or obligations under these Terms to anyone else without our consent.<br />
            You may designate a person (called a legacy contact) to manage your account if it is memorialized. Only your legacy contact or a person who you have identified in a valid will or similar document expressing clear consent to disclose your content upon death or incapacity will be able to seek disclosure from your account after it is memorialized.<br /><br />
            These Terms do not confer any third-party beneficiary rights. All of our rights and obligations under these Terms are freely assignable by us in connection with a merger, acquisition, or sale of assets, or by operation of law or otherwise.<br /><br />
            You should know that we may need to change the username for your account in certain circumstances (for example, if someone else claims the username and it appears unrelated to the name you use in everyday life). We will inform you in advance if we have to do this and explain why.<br /><br />
            We always appreciate your feedback and other suggestions about our products and services. But you should know that we may use them without any restriction or obligation to compensate you, and we are under no obligation to keep them confidential.<br /><br />
            We reserve all rights not expressly granted to you.
          </p>
        </div>

        {/* Section 5 */}
        <div ref={refs.other} id="other" className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Other terms and policies that may apply to you</h2>
        <ul className="list-disc pl-6 text-base text-gray-700 mb-4 marker:text-[#55E3EA] space-y-2">
          <li><span className="font-bold text-[#22223B]">Community Standards:</span> These guidelines outline our standards regarding the content you post to Facebook and your activity on Facebook and other Facebook Products.</li>
          <li><span className="font-bold text-[#22223B]">Commercial Terms:</span> These terms apply if you also access or use our Products for any commercial or business purpose, including advertising, operating an app on our Platform, using our measurement services, managing a group or a Page for a business, or selling goods or services.</li>
          <li><span className="font-bold text-[#22223B]">Advertising Policies:</span> These policies specify what types of ad content are allowed by partners who advertise across the Facebook Products.</li>
          <li><span className="font-bold text-[#22223B]">Self-Serve Ad Terms:</span> These terms apply when you use self-serve advertising interfaces to create, submit, or deliver advertising or other commercial or sponsored activity or content.</li>
          <li><span className="font-bold text-[#22223B]">Pages, Groups and Events Policy:</span> These guidelines apply if you create or administer a Facebook Page, group, or event, or if you use Facebook to communicate or administer a promotion.</li>
          <li><span className="font-bold text-[#22223B]">Facebook Platform Policy:</span> These guidelines outline the policies that apply to your use of our Platform (for example, for developers or operators of a Platform application or website or if you use social plugins).</li>
          <li><span className="font-bold text-[#22223B]">Developer Payment Terms:</span> These terms apply to developers of applications that use Facebook Payments.</li>
          <li><span className="font-bold text-[#22223B]">Community Payment Terms:</span> These terms apply to payments made on or through Facebook.</li>
          <li><span className="font-bold text-[#22223B]">Commerce Policies:</span> These guidelines outline the policies that apply when you offer products and services for sale on Facebook.</li>
          <li><span className="font-bold text-[#22223B]">Facebook Brand Resources:</span> These guidelines outline the policies that apply to use of Facebook trademarks, logos, and screenshots.</li>
          <li><span className="font-bold text-[#22223B]">Music Guidelines:</span> These guidelines outline the policies that apply if you post or share content containing music on Facebook.</li>
        </ul>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="hidden sm:flex flex-col w-1.5/5 px-4 sm:px-6 pt-12 sm:pt-28 text-justify pr-8 pl-2 bg-white sticky top-0 h-screen">
        <nav className="flex flex-col gap-2 text-base font-semibold text-[#22223B]">
          {sections.map((section, idx) => (
            <button
              key={section.id}
              onClick={() => handleScroll(section.id as keyof typeof refs)}
              className={
                `text-left py-2 px-2 transition-colors focus:outline-none font-semibold ` +
                (window?.location.hash === `#${section.id}` ? 'text-[#01DAE3]' : 'hover:text-[#01DAE3] focus:text-[#01DAE3]')
              }
              style={{
                fontWeight: 600,
                color: undefined,
                textDecoration: undefined,
              }}
            >
              {section.title}
            </button>
          ))}
        </nav>
      </aside>
    </div>
  );
}
