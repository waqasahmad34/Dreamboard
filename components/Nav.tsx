"use client";

import { ChevronDown, Menu, Search, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Logo from "@/components/Logo";
import { cn } from "@/lib/utils";
import TopBar from "./TopBar";

interface IComponentProps {
  className?: string;
}

const Nav = ({ className }: IComponentProps) => {
  const [isSofasDropdownOpen, setIsSofasDropdownOpen] = useState(false);
  const [isSectionalsDropdownOpen, setIsSectionalsDropdownOpen] =
    useState(false);
  const [isFurnitureDropdownOpen, setIsFurnitureDropdownOpen] = useState(false);
  const [isExploreDropdownOpen, setIsExploreDropdownOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isTopBarOpen, setIsTopBarOpen] = useState(false);

  const classNameLink1 = cn(
    "leading-[1]",
    "px-[15px]",
    "h-[55px]",
    "whitespace-nowrap",
    "text-[#c9a160] nav:text-[#000000]",
    "hover:bg-gray-light nav:hover:bg-gray-dark nav:hover:text-white",
    "w-full",
    "font-[700]",

    "flex items-center justify-between",
    "gap-1",

    "uppercase"
  );

  const classNameLink2 = cn(
    "transition-colors duration-200",
    "block",
    "px-[15px] nav:px-[15px] py-[12px]",
    "hover:bg-gray-light nav:hover:bg-gray-dark nav:hover:text-white",
    "uppercase",
    "text-left",
    "w-full"
  );

  const classNameLinkHeading = cn(
    "inline-flex",
    "mb-[15px]",
    "nav:px-[12px] pt-[15px] pb-[15px]",
    "nav:font-bold",
    "text-left",
    "text-[#B18E51]",
    "align-baseline",
    "whitespace-nowrap",
    "nav:border-b nav:border-b-[#b18e51]",
    "leading-[14px] tracking-[1px]",
    "uppercase"
    // "selection:bg-[#F97352] selection:text-white"
  );

  return (
    <div
      className={cn(
        "Nav",
        "bg-white",
        "shadow-md",
        "fixed nav:relative",
        "w-full",
        "h-[55px]",
        "flex flex-col",
        "text-dark",
        "z-[9999]",
        className
        // 'border-gray-light border-b',
      )}
    >
      <TopBar
        className="w-full shrink-0 grow-1"
        isOpen={isTopBarOpen}
        setIsOpen={setIsTopBarOpen}
      />
      <nav
        className={cn(
          "flex items-center justify-between",
          "relative",
          "w-full",
          "nav:px-[50px] px-[20px] sm:pt-0 pt-2.5",
          "bg-white"
        )}
      >
        {/* LOGO */}
        <Link
          className={cn("h-[55px]", "flex items-center justify-center")}
          href="https://www.dreamsofa.com"
        >
          <Logo
            className={cn(
              // "nav:w-[250px] w-[130px] xl:nav:w-[292px]"
              "h-[15px]",
              "xs:h-[20px]",
              "nav:h-[55px]"
            )}
          />
        </Link>

        {/* MENU */}
        <ul
          className={cn(
            "NavLevel1",
            "top-[55px]",
            isTopBarOpen && "top-[calc(80px+55px)]",
            isMobileMenuOpen
              ? "nav:translate-none translate-y-[0px]"
              : "nav:translate-none -translate-y-full",
            "nav:static fixed",
            "left-0 nav:left-auto",
            "w-full",
            "h-auto",
            "font-semibold text-[14px] uppercase",
            "transition-transform duration-300 ease-in-out",
            "flex items-stretch justify-start nav:justify-center",
            "nav:flex-row flex-col",
            "nav:z-1 z-[-1]",
            "bg-white",
            "mr-0 ml-auto",
            "max-h-[100vh]",
            "overflow-y-auto nav:overflow-y-visible",
            "nav:shadow-none shadow-md"
          )}
        >
          <li className="group nav:block hidden relative">
            <button
              className={cn(classNameLink1)}
              type="button"
              onClick={() => setIsSofasDropdownOpen(!isSofasDropdownOpen)}
            >
              <span className="relative top-[2px] flex">Sofas</span>
              <ChevronDown
                className={cn(
                  "nav:size-4 size-6",
                  "transition-transform duration-200",
                  isSofasDropdownOpen ? "rotate-180" : ""
                )}
              />
            </button>
            <ul
              className={cn(
                "NavLevel2",
                isSofasDropdownOpen ? "flex" : "hidden",
                "nav:group-hover:flex",
                "flex-col p-[15px]",
                "border border-gray-light bg-white",
                "nav:absolute nav:top-full nav:left-0",
                "nav:shadow-lg",
                "z-50",
                "min-w-[200px]"
              )}
            >
              <li>
                <Link
                  href="https://www.dreamsofa.com/product-category/sofa/"
                  className={cn(classNameLink2)}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sofas
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.dreamsofa.com/product-category/sofa-sleeper/"
                  className={cn(classNameLink2)}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sofa Sleepers
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.dreamsofa.com/product-category/modular-sofas/"
                  className={cn(classNameLink2)}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Modular Sofas
                </Link>
              </li>
            </ul>
          </li>

          <li className="group nav:block hidden relative">
            <button
              className={cn(classNameLink1)}
              type="button"
              onClick={() =>
                setIsSectionalsDropdownOpen(!isSectionalsDropdownOpen)
              }
            >
              <span className="relative top-[2px] flex">Sectionals</span>
              <ChevronDown
                className={cn(
                  "nav:size-4 size-6",
                  "transition-transform duration-200",
                  isSectionalsDropdownOpen ? "rotate-180" : ""
                )}
              />
            </button>
            <ul
              className={cn(
                "NavLevel2",
                isSectionalsDropdownOpen ? "flex" : "hidden",
                "nav:group-hover:flex",
                "flex-col",
                "z-50 p-[15px]",
                "min-w-[200px]",
                "border border-gray-light",
                "bg-white",
                "nav:absolute nav:top-full nav:left-0",
                "nav:shadow-lg"
              )}
            >
              <li>
                <Link
                  href="https://www.dreamsofa.com/product-category/sectional/"
                  className={cn(classNameLink2)}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sectionals
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.dreamsofa.com/product-category/sectional-sleeper/"
                  className={cn(classNameLink2)}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sectional Sleepers
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.dreamsofa.com/product-category/modular-sectionals/"
                  className={cn(classNameLink2)}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Modular Sectionals
                </Link>
              </li>
            </ul>
          </li>

          <li className="group nav:block hidden relative">
            <button
              className={cn(classNameLink1)}
              type="button"
              onClick={() =>
                setIsFurnitureDropdownOpen(!isFurnitureDropdownOpen)
              }
            >
              +
            </button>
            <ul
              className={cn(
                "NavLevel2",
                isFurnitureDropdownOpen ? "flex" : "hidden",
                "nav:group-hover:flex",
                "flex-col",
                "z-50",
                "min-w-[200px]",
                "border border-gray-light",
                "bg-white",
                "nav:absolute nav:top-full nav:left-0",
                "nav:shadow-lg"
              )}
            >
              <li>
                <Link
                  href="https://www.dreamsofa.com/product-category/chair/"
                  className={cn(classNameLink2)}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Chairs
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.dreamsofa.com/product-category/bed/"
                  className={cn(classNameLink2)}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Beds
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav:block hidden">
            <Link
              href="https://www.dreamsofa.com/book-an-appointment/#visitus"
              className={classNameLink1}
              // onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="relative top-[2px] flex">Design Call</span>
            </Link>
          </li>
          <li className="nav:block hidden">
            <Link
              href="https://www.dreamsofa.com/reviews/"
              className={classNameLink1}
              // onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="relative top-[2px] flex">Reviews</span>
            </Link>
          </li>
          <li className="group nav:block hidden relative">
            <button
              className={cn(classNameLink1)}
              type="button"
              onClick={() => setIsExploreDropdownOpen(!isExploreDropdownOpen)}
            >
              <span className="relative top-[2px] flex">Explore</span>
              <ChevronDown
                className={cn(
                  "nav:size-4 size-6",
                  "transition-transform duration-200",
                  isExploreDropdownOpen ? "rotate-180" : ""
                )}
              />
            </button>
            <ul
              className={cn(
                "NavLevel2",
                isExploreDropdownOpen ? "grid" : "hidden",
                "nav:group-hover:grid",
                "bg-white",
                "border border-gray-light",
                "p-[15px]",
                "min-w-[300px]",
                "nav:absolute nav:right-0 z-50",
                "nav:shadow-lg",
                "grid-cols-[auto] nav:grid-cols-[auto_auto_auto] nav:gap-[15px]"
              )}
            >
              <li>
                <span
                  className={cn(
                    classNameLinkHeading,
                    "mb-0",
                    "nav:block hidden"
                  )}
                >
                  Shop by Video
                </span>
                <ul className="NavLevel3">
                  <li>
                    <Link
                      href="https://www.dreamsofa.com/shop-by-video/"
                      className={cn(
                        classNameLink2
                        // 'pl-0 text-[#B18E51]'
                      )}
                    >
                      Shop by Video
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <span
                  className={cn(
                    classNameLinkHeading,
                    "mb-0",
                    "nav:block hidden"
                  )}
                >
                  Shop by Color
                </span>

                <ul className="NavLevel3">
                  <li>
                    <Link
                      href="https://www.dreamsofa.com/shop-by-color/"
                      className={cn(
                        classNameLink2
                        // 'pl-0 text-[#B18E51]'
                      )}
                    >
                      Shop by Color
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <span className={cn(classNameLinkHeading, "mb-0")}>
                  Shop by Collection
                </span>

                <ul className="NavLevel2">
                  <li>
                    <Link
                      href="https://www.dreamsofa.com/all-sofas/?cat=all"
                      className={cn(classNameLink2)}
                    >
                      Sofas
                    </Link>
                  </li>

                  <li className="group/sectionals block">
                    <button className={cn(classNameLink2)} type="button">
                      Sectionals
                    </button>
                    <ul className="NavLevel3 nav:hidden flex-col group-hover/sectionals:flex">
                      <li>
                        <Link
                          href="https://www.dreamsofa.com/all-sectionals/?cat=all"
                          className={cn(
                            classNameLink2,
                            "nav:pl-[15px] pl-[25px]"
                          )}
                        >
                          All
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://www.dreamsofa.com/all-sectionals/?cat=modern"
                          className={cn(
                            classNameLink2,
                            "nav:pl-[15px] pl-[25px]"
                          )}
                        >
                          Modern
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://www.dreamsofa.com/all-sectionals/?cat=midcentury"
                          className={cn(
                            classNameLink2,
                            "nav:pl-[15px] pl-[25px]"
                          )}
                        >
                          Midcentury
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://www.dreamsofa.com/all-sectionals/?cat=classic"
                          className={cn(
                            classNameLink2,
                            "nav:pl-[15px] pl-[25px]"
                          )}
                        >
                          Classic
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://www.dreamsofa.com/all-sectionals/?cat=contemporary"
                          className={cn(
                            classNameLink2,
                            "nav:pl-[15px] pl-[25px]"
                          )}
                        >
                          Contemporary
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="group/chairs block">
                    <span className={cn(classNameLink2)}>Chairs</span>
                    <ul className="NavLevel3 nav:hidden flex-col group-hover/chairs:flex">
                      <li>
                        <Link
                          href="https://www.dreamsofa.com/all-chairs/?cat=all"
                          className={cn(
                            classNameLink2,
                            "nav:pl-[15px] pl-[25px]"
                          )}
                        >
                          All
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://www.dreamsofa.com/all-chairs/?cat=modern"
                          className={cn(
                            classNameLink2,
                            "nav:pl-[15px] pl-[25px]"
                          )}
                        >
                          Modern
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://www.dreamsofa.com/all-chairs/?cat=midcentury"
                          className={cn(
                            classNameLink2,
                            "nav:pl-[15px] pl-[25px]"
                          )}
                        >
                          Midcentury
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://www.dreamsofa.com/all-chairs/?cat=classic"
                          className={cn(
                            classNameLink2,
                            "nav:pl-[15px] pl-[25px]"
                          )}
                        >
                          Classic
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://www.dreamsofa.com/all-chairs/?cat=contemporary"
                          className={cn(
                            classNameLink2,
                            "nav:pl-[15px] pl-[25px]"
                          )}
                        >
                          Contemporary
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="nav:block hidden">
            <Link
              href="https://www.dreamsofa.com/order-free-swatches/"
              className={cn(classNameLink1, "nav:!text-white nav:bg-[#50c9ce]")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="relative top-[2px] flex">Free Swatch</span>
            </Link>
          </li>
          <li className="group nav:block hidden relative">
            <button
              className={cn(classNameLink1)}
              type="button"
              onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
            >
              <span className="relative top-[2px] flex">About</span>
              <ChevronDown
                className={cn(
                  "nav:size-4 size-6",
                  "transition-transform duration-200",
                  isAboutDropdownOpen ? "rotate-180" : ""
                )}
              />
            </button>
            <ul
              className={cn(
                "NavLevel2",
                isAboutDropdownOpen ? "grid" : "hidden",
                "nav:group-hover:grid",
                "grid-cols-[auto] nav:grid-cols-[auto_auto] gap-[15px]",
                "bg-white",
                "border border-gray-light",
                "p-[15px]",
                "nav:absolute nav:right-0",
                "z-50",
                "min-w-[300px]",
                "shadow-lg"
              )}
            >
              <li>
                <span className={cn(classNameLinkHeading)}>Get In Touch</span>

                <ul>
                  <li>
                    <a
                      href="tel:+18553753275"
                      className={cn(classNameLink2, "dyn_phoneno")}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      855-375-3275
                    </a>
                  </li>
                  <li>
                    <Link
                      href="https://www.dreamsofa.com/contact/"
                      className={cn(classNameLink2)}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.dreamsofa.com/book-an-appointment/"
                      className={cn(classNameLink2)}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Book Appointment
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <span className={cn(classNameLinkHeading)}>About</span>

                <ul>
                  <li>
                    <Link
                      href="https://www.dreamsofa.com/blog/"
                      className={cn(classNameLink2)}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.dreamsofa.com/design-your-own/"
                      className={cn(classNameLink2)}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Design Your Own
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.dreamsofa.com/our-story/"
                      className={cn(classNameLink2)}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Our Story
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.dreamsofa.com/personalization/"
                      className={cn(classNameLink2)}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Personalization
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.dreamsofa.com/custom-sofa-design/"
                      className={cn(classNameLink2)}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Custom Made Sofas
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.dreamsofa.com/quality/"
                      className={cn(classNameLink2)}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Quality
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.dreamsofa.com/fabrics/"
                      className={cn(classNameLink2)}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Fabrics
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.dreamsofa.com/warranty/"
                      className={cn(classNameLink2)}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Warranty
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.dreamsofa.com/delivery/"
                      className={cn(classNameLink2)}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Delivery
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.dreamsofa.com/pricing/"
                      className={cn(classNameLink2)}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Pricing
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          {/* Mobile View Menu */}
          {isMobileMenuOpen && (
            <li className="group nav:hidden  relative">
              <button
                className={cn(classNameLink1)}
                type="button"
                onClick={() => setIsSofasDropdownOpen(!isSofasDropdownOpen)}
              >
                <span className="relative top-[2px] flex">Sofas</span>
                <ChevronDown
                  className={cn(
                    "nav:size-4 size-6",
                    "transition-transform duration-200",
                    isSofasDropdownOpen ? "rotate-180" : ""
                  )}
                />
              </button>
              <ul
                className={cn(
                  "NavLevel2",
                  isSofasDropdownOpen ? "flex" : "hidden",
                  "nav:group-hover:flex",
                  "flex-col p-[15px]",
                  "border border-gray-light bg-white",
                  "nav:absolute nav:top-full nav:left-0",
                  "nav:shadow-lg",
                  "z-50",
                  "min-w-[200px]"
                )}
              >
                <li>
                  <Link
                    href="https://www.dreamsofa.com/product-category/sofa/"
                    className={cn(classNameLink2)}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sofas
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.dreamsofa.com/product-category/sofa-sleeper/"
                    className={cn(classNameLink2)}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sofa Sleepers
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.dreamsofa.com/product-category/modular-sofas/"
                    className={cn(classNameLink2)}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Modular Sofas
                  </Link>
                </li>
              </ul>
            </li>
          )}

          {isMobileMenuOpen && (
            <li className="group nav:hidden relative">
            <button
              className={cn(classNameLink1)}
              type="button"
              onClick={() =>
                setIsSectionalsDropdownOpen(!isSectionalsDropdownOpen)
              }
            >
              <span className="relative top-[2px] flex">Sectionals</span>
              <ChevronDown
                className={cn(
                  "nav:size-4 size-6",
                  "transition-transform duration-200",
                  isSectionalsDropdownOpen ? "rotate-180" : ""
                )}
              />
            </button>
            <ul
              className={cn(
                "NavLevel2",
                isSectionalsDropdownOpen ? "flex" : "hidden",
                "nav:group-hover:flex",
                "flex-col",
                "z-50 p-[15px]",
                "min-w-[200px]",
                "border border-gray-light",
                "bg-white",
                "nav:absolute nav:top-full nav:left-0",
                "nav:shadow-lg"
              )}
            >
              <li>
                <Link
                  href="https://www.dreamsofa.com/product-category/sectional/"
                  className={cn(classNameLink2)}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sectionals
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.dreamsofa.com/product-category/sectional-sleeper/"
                  className={cn(classNameLink2)}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sectional Sleepers
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.dreamsofa.com/product-category/modular-sectionals/"
                  className={cn(classNameLink2)}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Modular Sectionals
                </Link>
              </li>
            </ul>
          </li>
          )}
          {isMobileMenuOpen && (
              <li className="group nav:hidden relative">
            <button
              className={cn(classNameLink1)}
              type="button"
              onClick={() =>
                setIsFurnitureDropdownOpen(!isFurnitureDropdownOpen)
              }
            >
              +
            </button>
            <ul
              className={cn(
                "NavLevel2",
                isFurnitureDropdownOpen ? "flex" : "hidden",
                "nav:group-hover:flex",
                "flex-col",
                "z-50",
                "min-w-[200px]",
                "border border-gray-light",
                "bg-white",
                "nav:absolute nav:top-full nav:left-0",
                "nav:shadow-lg"
              )}
            >
              <li>
                <Link
                  href="https://www.dreamsofa.com/product-category/chair/"
                  className={cn(classNameLink2)}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Chairs
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.dreamsofa.com/product-category/bed/"
                  className={cn(classNameLink2)}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Beds
                </Link>
              </li>
            </ul>
          </li>
          )}
          {isMobileMenuOpen && (        
            <li className="nav:hidden">
            <Link
              href="https://www.dreamsofa.com/book-an-appointment/#visitus"
              className={classNameLink1}
              // onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="relative top-[2px] flex">Design Call</span>
            </Link>
          </li>
          )}
          {isMobileMenuOpen && (
          <li className="nav:hidden">
            <Link
              href="https://www.dreamsofa.com/reviews/"
              className={classNameLink1}
              // onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="relative top-[2px] flex">Reviews</span>
            </Link>
          </li>
          )}
          {isMobileMenuOpen && (
          <li className="group nav:hidden relative">
            <button
              className={cn(classNameLink1)}
              type="button"
              onClick={() => setIsExploreDropdownOpen(!isExploreDropdownOpen)}
            >
              <span className="relative top-[2px] flex">Explore</span>
              <ChevronDown
                className={cn(
                  "nav:size-4 size-6",
                  "transition-transform duration-200",
                  isExploreDropdownOpen ? "rotate-180" : ""
                )}
              />
            </button>
            <ul
              className={cn(
                "NavLevel2",
                isExploreDropdownOpen ? "grid" : "hidden",
                "nav:group-hover:grid",
                "bg-white",
                "border border-gray-light",
                "p-[15px]",
                "min-w-[300px]",
                "nav:absolute nav:right-0 z-50",
                "nav:shadow-lg",
                "grid-cols-[auto] nav:grid-cols-[auto_auto_auto] nav:gap-[15px]"
              )}
            >
              <li>
                <span
                  className={cn(
                    classNameLinkHeading,
                    "mb-0",
                    "nav:block hidden"
                  )}
                >
                  Shop by Video
                </span>
                <ul className="NavLevel3">
                  <li>
                    <Link
                      href="https://www.dreamsofa.com/shop-by-video/"
                      className={cn(
                        classNameLink2
                        // 'pl-0 text-[#B18E51]'
                      )}
                    >
                      Shop by Video
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <span
                  className={cn(
                    classNameLinkHeading,
                    "mb-0",
                    "nav:block hidden"
                  )}
                >
                  Shop by Color
                </span>

                <ul className="NavLevel3">
                  <li>
                    <Link
                      href="https://www.dreamsofa.com/shop-by-color/"
                      className={cn(
                        classNameLink2
                        // 'pl-0 text-[#B18E51]'
                      )}
                    >
                      Shop by Color
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <span className={cn(classNameLinkHeading, "mb-0")}>
                  Shop by Collection
                </span>

                <ul className="NavLevel2">
                  <li>
                    <Link
                      href="https://www.dreamsofa.com/all-sofas/?cat=all"
                      className={cn(classNameLink2)}
                    >
                      Sofas
                    </Link>
                  </li>

                  <li className="group/sectionals block">
                    <button className={cn(classNameLink2)} type="button">
                      Sectionals
                    </button>
                    <ul className="NavLevel3 nav:hidden flex-col group-hover/sectionals:flex">
                      <li>
                        <Link
                          href="https://www.dreamsofa.com/all-sectionals/?cat=all"
                          className={cn(
                            classNameLink2,
                            "nav:pl-[15px] pl-[25px]"
                          )}
                        >
                          All
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://www.dreamsofa.com/all-sectionals/?cat=modern"
                          className={cn(
                            classNameLink2,
                            "nav:pl-[15px] pl-[25px]"
                          )}
                        >
                          Modern
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://www.dreamsofa.com/all-sectionals/?cat=midcentury"
                          className={cn(
                            classNameLink2,
                            "nav:pl-[15px] pl-[25px]"
                          )}
                        >
                          Midcentury
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://www.dreamsofa.com/all-sectionals/?cat=classic"
                          className={cn(
                            classNameLink2,
                            "nav:pl-[15px] pl-[25px]"
                          )}
                        >
                          Classic
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://www.dreamsofa.com/all-sectionals/?cat=contemporary"
                          className={cn(
                            classNameLink2,
                            "nav:pl-[15px] pl-[25px]"
                          )}
                        >
                          Contemporary
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="group/chairs block">
                    <span className={cn(classNameLink2)}>Chairs</span>
                    <ul className="NavLevel3 nav:hidden flex-col group-hover/chairs:flex">
                      <li>
                        <Link
                          href="https://www.dreamsofa.com/all-chairs/?cat=all"
                          className={cn(
                            classNameLink2,
                            "nav:pl-[15px] pl-[25px]"
                          )}
                        >
                          All
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://www.dreamsofa.com/all-chairs/?cat=modern"
                          className={cn(
                            classNameLink2,
                            "nav:pl-[15px] pl-[25px]"
                          )}
                        >
                          Modern
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://www.dreamsofa.com/all-chairs/?cat=midcentury"
                          className={cn(
                            classNameLink2,
                            "nav:pl-[15px] pl-[25px]"
                          )}
                        >
                          Midcentury
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://www.dreamsofa.com/all-chairs/?cat=classic"
                          className={cn(
                            classNameLink2,
                            "nav:pl-[15px] pl-[25px]"
                          )}
                        >
                          Classic
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://www.dreamsofa.com/all-chairs/?cat=contemporary"
                          className={cn(
                            classNameLink2,
                            "nav:pl-[15px] pl-[25px]"
                          )}
                        >
                          Contemporary
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          )}
          {isMobileMenuOpen && (
            <li className="nav:hidden">
            <Link
              href="https://www.dreamsofa.com/order-free-swatches/"
              className={cn(classNameLink1, "nav:!text-white nav:bg-[#50c9ce]")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="relative top-[2px] flex">Free Swatch</span>
            </Link>
          </li>
          )}
          {isMobileMenuOpen && (
          <li className="group nav:hidden relative">
            <button
              className={cn(classNameLink1)}
              type="button"
              onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
            >
              <span className="relative top-[2px] flex">About</span>
              <ChevronDown
                className={cn(
                  "nav:size-4 size-6",
                  "transition-transform duration-200",
                  isAboutDropdownOpen ? "rotate-180" : ""
                )}
              />
            </button>
            <ul
              className={cn(
                "NavLevel2",
                isAboutDropdownOpen ? "grid" : "hidden",
                "nav:group-hover:grid",
                "grid-cols-[auto] nav:grid-cols-[auto_auto] gap-[15px]",
                "bg-white",
                "border border-gray-light",
                "p-[15px]",
                "nav:absolute nav:right-0",
                "z-50",
                "min-w-[300px]",
                "shadow-lg"
              )}
            >
              <li>
                <span className={cn(classNameLinkHeading)}>Get In Touch</span>

                <ul>
                  <li>
                    <a
                      href="tel:+18553753275"
                      className={cn(classNameLink2, "dyn_phoneno")}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      855-375-3275
                    </a>
                  </li>
                  <li>
                    <Link
                      href="https://www.dreamsofa.com/contact/"
                      className={cn(classNameLink2)}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.dreamsofa.com/book-an-appointment/"
                      className={cn(classNameLink2)}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Book Appointment
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <span className={cn(classNameLinkHeading)}>About</span>

                <ul>
                  <li>
                    <Link
                      href="https://www.dreamsofa.com/blog/"
                      className={cn(classNameLink2)}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.dreamsofa.com/design-your-own/"
                      className={cn(classNameLink2)}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Design Your Own
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.dreamsofa.com/our-story/"
                      className={cn(classNameLink2)}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Our Story
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.dreamsofa.com/personalization/"
                      className={cn(classNameLink2)}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Personalization
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.dreamsofa.com/custom-sofa-design/"
                      className={cn(classNameLink2)}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Custom Made Sofas
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.dreamsofa.com/quality/"
                      className={cn(classNameLink2)}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Quality
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.dreamsofa.com/fabrics/"
                      className={cn(classNameLink2)}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Fabrics
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.dreamsofa.com/warranty/"
                      className={cn(classNameLink2)}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Warranty
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.dreamsofa.com/delivery/"
                      className={cn(classNameLink2)}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Delivery
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.dreamsofa.com/pricing/"
                      className={cn(classNameLink2)}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Pricing
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          )}
        </ul>

        {/* SEARCH / CART */}
        <div
          className={cn("flex items-center", "gap-[20px]", "mr-[20px] ml-auto")}
          suppressHydrationWarning
        >
          {/* <button
            type="button"
            className="transition-colors duration-200 hover:[&>svg]:stroke-primary"
          >
            <Search />
          </button> */}
          <a
            // type="button"
            href="https://www.dreamsofa.com/cart/"
            className="flex items-center gap-[5px] transition-colors duration-200 hover:[&>svg]:stroke-primary"
          >
            <ShoppingCart />
            {/* <span className="text-[11px]">0</span> */}
          </a>
        </div>

        {/* BURGER */}
        <button
          className={cn(
            "ButtonBurger",
            "transition-colors duration-200",
            "items-center gap-[20px]",
            "flex nav:hidden",
            "hover:[&>svg]:stroke-primary",
            "relative",
            "z-[100]"
            // 'p-[10px]',
          )}
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="size-8" />
          ) : (
            <Menu className="size-8" />
          )}
        </button>
      </nav>
    </div>
  );
};

export default Nav;
