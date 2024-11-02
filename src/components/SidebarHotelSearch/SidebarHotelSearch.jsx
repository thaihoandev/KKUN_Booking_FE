import React from "react";

function SidebarHotelSearch() {
    return (
        <>
            <div class="sidebar-area">
                <div class="single-widget mb-30">
                    <h5 class="widget-title">Search Here</h5>
                    <form>
                        <div class="search-box">
                            <input type="text" placeholder="Search Here" />
                            <button type="submit">
                                <i class="bx bx-search"></i>
                            </button>
                        </div>
                    </form>
                </div>
                <div class="single-widget mb-30">
                    <h5 class="widget-title">Popular Filters</h5>
                    <div class="checkbox-container">
                        <ul>
                            <li>
                                <label class="containerss">
                                    <input type="checkbox" />
                                    <span class="checkmark"></span>
                                    <span class="text">
                                        Book without credit card
                                    </span>
                                    <span class="qty">250</span>
                                </label>
                            </li>
                            <li>
                                <label class="containerss">
                                    <input type="checkbox" />
                                    <span class="checkmark"></span>
                                    <span class="text">Free cancellation</span>
                                    <span class="qty">90</span>
                                </label>
                            </li>
                            <li>
                                <label class="containerss">
                                    <input type="checkbox" />
                                    <span class="checkmark"></span>
                                    <span class="text">
                                        br/eakfast Included
                                    </span>
                                    <span class="qty">35</span>
                                </label>
                            </li>
                            <li>
                                <label class="containerss">
                                    <input type="checkbox" />
                                    <span class="checkmark"></span>
                                    <span class="text">No prepayment</span>
                                    <span class="qty">28</span>
                                </label>
                            </li>
                            <li>
                                <label class="containerss">
                                    <input type="checkbox" />
                                    <span class="checkmark"></span>
                                    <span class="text">Romantic</span>
                                    <span class="qty">12</span>
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="single-widget mb-30">
                    <h5 class="shop-widget-title">Price Filter</h5>
                    <div class="range-wrap">
                        <div class="row">
                            <div class="col-sm-12">
                                <form>
                                    <input
                                        type="hidden"
                                        name="min-value"
                                        value
                                    />
                                    <input
                                        type="hidden"
                                        name="max-value"
                                        value
                                    />
                                </form>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <div id="slider-range"></div>
                            </div>
                        </div>
                        <div class="slider-labels">
                            <div class="caption">
                                <span id="slider-range-value1"></span>
                            </div>
                            <a href="#">Apply</a>
                            <div class="caption">
                                <span id="slider-range-value2"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="single-widget mb-30">
                    <h5 class="widget-title">Facilities</h5>
                    <div class="checkbox-container">
                        <ul>
                            <li>
                                <label class="containerss">
                                    <input type="checkbox" />
                                    <span class="checkmark"></span>
                                    <span class="text">Airport shuttle</span>
                                    <span class="qty">30</span>
                                </label>
                            </li>
                            <li>
                                <label class="containerss">
                                    <input type="checkbox" />
                                    <span class="checkmark"></span>
                                    <span class="text">Locker</span>
                                    <span class="qty">90</span>
                                </label>
                            </li>
                            <li>
                                <label class="containerss">
                                    <input type="checkbox" />
                                    <span class="checkmark"></span>
                                    <span class="text">Gym</span>
                                    <span class="qty">35</span>
                                </label>
                            </li>
                            <li>
                                <label class="containerss">
                                    <input type="checkbox" />
                                    <span class="checkmark"></span>
                                    <span class="text">Spa</span>
                                    <span class="qty">28</span>
                                </label>
                            </li>
                            <li>
                                <label class="containerss">
                                    <input type="checkbox" />
                                    <span class="checkmark"></span>
                                    <span class="text">Parking</span>
                                    <span class="qty">70</span>
                                </label>
                            </li>
                            <li>
                                <label class="containerss">
                                    <input type="checkbox" />
                                    <span class="checkmark"></span>
                                    <span class="text">Restaurant</span>
                                    <span class="qty">120</span>
                                </label>
                            </li>
                            <li>
                                <label class="containerss">
                                    <input type="checkbox" />
                                    <span class="checkmark"></span>
                                    <span class="text">Swimming pool</span>
                                    <span class="qty">36</span>
                                </label>
                            </li>
                            <li>
                                <label class="containerss">
                                    <input type="checkbox" />
                                    <span class="checkmark"></span>
                                    <span class="text">Pet friendly</span>
                                    <span class="qty">10</span>
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="single-widget mb-30">
                    <h5 class="widget-title">Star Rating</h5>
                    <div class="checkbox-container">
                        <ul>
                            <li>
                                <label class="containerss">
                                    <input type="checkbox" />
                                    <span class="checkmark"></span>
                                    <span class="stars">
                                        <i class="bi bi-star-fill"></i>
                                        <i class="bi bi-star-fill"></i>
                                        <i class="bi bi-star-fill"></i>
                                        <i class="bi bi-star-fill"></i>
                                        <i class="bi bi-star-fill"></i>
                                        <a href="#" class="review-no">
                                            (5)
                                        </a>
                                    </span>
                                </label>
                            </li>
                            <li>
                                <label class="containerss">
                                    <input type="checkbox" />
                                    <span class="checkmark"></span>
                                    <span class="stars">
                                        <i class="bi bi-star-fill"></i>
                                        <i class="bi bi-star-fill"></i>
                                        <i class="bi bi-star-fill"></i>
                                        <i class="bi bi-star-fill"></i>
                                        <i class="bi bi-star-half"></i>
                                        <a href="#" class="review-no">
                                            (4.5)
                                        </a>
                                    </span>
                                </label>
                            </li>
                            <li>
                                <label class="containerss">
                                    <input type="checkbox" />
                                    <span class="checkmark"></span>
                                    <span class="stars">
                                        <i class="bi bi-star-fill"></i>
                                        <i class="bi bi-star-fill"></i>
                                        <i class="bi bi-star-fill"></i>
                                        <i class="bi bi-star-fill"></i>
                                        <a href="#" class="review-no">
                                            (4.0)
                                        </a>
                                    </span>
                                </label>
                            </li>
                            <li>
                                <label class="containerss">
                                    <input type="checkbox" />
                                    <span class="checkmark"></span>
                                    <span class="stars">
                                        <i class="bi bi-star-fill"></i>
                                        <i class="bi bi-star-fill"></i>
                                        <i class="bi bi-star-fill"></i>
                                        <i class="bi bi-star-half"></i>
                                        <a href="#" class="review-no">
                                            (3.5)
                                        </a>
                                    </span>
                                </label>
                            </li>
                            <li>
                                <label class="containerss">
                                    <input type="checkbox" />
                                    <span class="checkmark"></span>
                                    <span class="stars">
                                        <i class="bi bi-star-fill"></i>
                                        <i class="bi bi-star-fill"></i>
                                        <i class="bi bi-star-fill"></i>
                                        <a href="#" class="review-no">
                                            (3.0)
                                        </a>
                                    </span>
                                </label>
                            </li>
                            <li>
                                <label class="containerss">
                                    <input type="checkbox" />
                                    <span class="checkmark"></span>
                                    <span class="stars">
                                        <i class="bi bi-star-fill"></i>
                                        <i class="bi bi-star-fill"></i>
                                        <i class="bi bi-star-half"></i>
                                        <a href="#" class="review-no">
                                            (2.5)
                                        </a>
                                    </span>
                                </label>
                            </li>
                            <li>
                                <label class="containerss">
                                    <input type="checkbox" />
                                    <span class="checkmark"></span>
                                    <span class="stars">
                                        <i class="bi bi-star-fill"></i>
                                        <i class="bi bi-star-fill"></i>
                                        <a href="#" class="review-no">
                                            (2.0)
                                        </a>
                                    </span>
                                </label>
                            </li>
                            <li>
                                <label class="containerss">
                                    <input type="checkbox" />
                                    <span class="checkmark"></span>
                                    <span class="stars">
                                        <i class="bi bi-star-fill"></i>
                                        <a href="#" class="review-no">
                                            (1.0)
                                        </a>
                                    </span>
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="single-widget">
                    <h5 class="widget-title">Room Accessibility</h5>
                    <div class="checkbox-container">
                        <ul>
                            <li>
                                <label class="containerss">
                                    <input type="checkbox" />
                                    <span class="checkmark"></span>
                                    <span class="text">Adapted bath</span>
                                    <span class="qty">250</span>
                                </label>
                            </li>
                            <li>
                                <label class="containerss">
                                    <input type="checkbox" />
                                    <span class="checkmark"></span>
                                    <span class="text">Roll-in shower</span>
                                    <span class="qty">90</span>
                                </label>
                            </li>
                            <li>
                                <label class="containerss">
                                    <input type="checkbox" />
                                    <span class="checkmark"></span>
                                    <span class="text">Raised toilet</span>
                                    <span class="qty">35</span>
                                </label>
                            </li>
                            <li>
                                <label class="containerss">
                                    <input type="checkbox" />
                                    <span class="checkmark"></span>
                                    <span class="text">
                                        Emergency cord in bathroom
                                    </span>
                                    <span class="qty">28</span>
                                </label>
                            </li>
                            <li>
                                <label class="containerss">
                                    <input type="checkbox" />
                                    <span class="checkmark"></span>
                                    <span class="text">Shower chair</span>
                                    <span class="qty">12</span>
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SidebarHotelSearch;
