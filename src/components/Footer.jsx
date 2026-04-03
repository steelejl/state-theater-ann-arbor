const imgWithHeadline = "/assets/logo.png";
const imgMap = "/assets/map.png";
const imgSocialX = "/assets/social-x.png";
const imgSocialFb = "/assets/social-fb.png";
const imgSocialIg = "/assets/social-ig.png";

const navColumns = [
  { heading: 'Navigate', links: ['Our Theaters', 'About', 'Blog', 'Contact'] },
  { heading: 'Join Us', links: ['Careers', 'Memberships', 'Sponsorships'] },
  { heading: 'Support', links: ['Ways to Support', 'Donate', 'Partners', 'Volunteer'] },
  { heading: "What's On", links: ['All Films', 'Featured Films', 'Coming Soon', 'Calendar'] },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#1d1818] px-24 py-12">
      <div className="flex gap-8 items-start">
        <div className="flex-1 flex flex-col gap-16">
          <div className="flex flex-wrap gap-y-8 justify-between pr-24">
            {navColumns.map(({ heading, links }) => (
              <div key={heading} className="flex flex-col gap-2">
                <p className="text-[#f3f2f2] font-extrabold text-2xl tracking-wide">{heading}</p>
                <div className="flex flex-col gap-2 pt-2">
                  {links.map((link) => (
                    <a
                      key={link}
                      href="#"
                      className="text-[#f3f2f2] text-lg hover:text-[#ffd03d] transition-colors whitespace-nowrap"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1 items-start">
            <div className="flex items-center gap-3">
              <img src={imgSocialIg} alt="Instagram" className="w-5 h-5 object-contain" />
              <img src={imgSocialFb} alt="Facebook" className="w-5 h-5 object-contain" />
              <img src={imgSocialX} alt="X" className="w-5 h-5 object-contain" />
            </div>
            <img
              src={imgWithHeadline}
              alt="State Theatre Ann Arbor"
              style={{ height: '148px', width: 'auto', display: 'block' }}
            />
          </div>
        </div>
        <div className="shrink-0 w-[420px] h-[420px] rounded-2xl overflow-hidden">
          <img src={imgMap} alt="Ann Arbor, Michigan map" className="w-full h-full object-cover" />
        </div>
      </div>
    </footer>
  );
}
