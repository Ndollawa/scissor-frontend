import React from 'react'

const Search = () => {
  return (
    <div className="search-popup">
        <div className="search-popup__overlay search-toggler"></div>
        
        {/* <!-- /.search-popup__overlay --> */}
        <div className="search-popup__content">
            <form action="#">
                <label htmlFor="search" className="sr-only">search here</label>
                {/* <!-- /.sr-only --> */}
                <input type="text" id="search" placeholder="Search Here..." />
                <button type="submit" aria-label="search submit" className="thm-btn">
                    <i className="icon-magnifying-glass"></i>
                </button>
            </form>
        </div>
        
        {/* <!-- /.search-popup__content --> */}
    </div>
  )
}

export default React.memo(Search)
