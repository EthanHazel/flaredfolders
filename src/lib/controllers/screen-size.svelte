<div id="screen-size">
    <h1>Your screen is too small to view this content!</h1>
    <p>I'm gonna put more content here eventually.</p>
</div>

<style>
    #screen-size {
        display: none;
    }

    @media (max-width: 720px) or (max-height: 610px) {
        #screen-size {
            text-align: center;
            display: flex !important;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: var(--interface-gap);
            position: fixed;
            z-index: 5;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            background-color: var(--background-color);
        }
    }
</style>
