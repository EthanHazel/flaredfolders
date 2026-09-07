<script>
    import { _ } from "svelte-i18n";

    import {
        FolderInput,
        SquarePlay,
        Scale,
        ShieldQuestionMark,
    } from "@lucide/svelte";

    import { openScreen } from "./lib/utils/stores";

    import { settingsStore } from "./lib/utils/local-storage";

    import { version } from "../package.json";

    function getCopyright() {
        return $_("home.copyright").replace("%YEAR%", "2026");
    }
</script>

<div
    id="home"
    class="screen"
    style="background-image: url('/assets/temp-background-{$settingsStore.theme}.jpg');"
>
    <div id="home-center">
        <img
            src="/assets/rooty/wave.png"
            alt="Rooty Waving"
            class="rooty"
            style="transform: translate(-50%, -218px); width: 240px;"
        />
        <div id="home-left">
            <h1>{$_("home.subTitle")}</h1>
            <p class="small">
                {$_("home.license")}
            </p>
            <p class="small">
                {getCopyright()}
            </p>
            <p class="small">
                {$_("home.version")}
                {version}
            </p>
        </div>
        <ul id="home-right">
            <li>
                <a onclick={() => alert("Work In Progress")}>
                    <FolderInput size={24} />
                    {$_("home.buttons.howToApply")}
                </a>
            </li>
            <li>
                <a onclick={() => alert("Work In Progress")}>
                    <SquarePlay size={24} />
                    {$_("home.buttons.editorTutorial")}
                </a>
            </li>
            <li>
                <a onclick={() => openScreen("privacy-policy")}>
                    <ShieldQuestionMark size={24} />
                    {$_("home.buttons.privacyPolicy")}
                </a>
            </li>
            <li>
                <a onclick={() => openScreen("licenses")}>
                    <Scale size={24} />
                    {$_("home.buttons.licensesAndAttributions")}
                </a>
            </li>
        </ul>
    </div>
</div>

<style>
    #home-center {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        text-align: center;
        width: 860px;
        height: 360px;
        outline: 1px solid rgba(from var(--text-color) r g b / 0.25);
        border-radius: 1rem;
        background-color: rgba(from var(--background-color) r g b / 0.75);
        backdrop-filter: blur(1rem);

        & #home-left,
        & #home-right {
            text-align: left;
            padding: 3rem;
        }

        & #home-left {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: flex-start;
            gap: var(--interface-gap);
            height: 100%;

            & .small {
                font-size: 0.8rem;
                line-height: 2;
                color: rgba(from var(--text-color) r g b / 0.5);
            }
        }

        & #home-right {
            display: flex;
            flex-direction: column;
            gap: var(--interface-gap);
            border-left: 1px solid rgba(from var(--text-color) r g b / 0.25);
            list-style: none;
            justify-content: space-around;
            align-items: flex-start;
            width: 50%;
            height: 100%;

            & a {
                cursor: pointer;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                gap: var(--interface-gap);
                text-decoration: none;
                color: var(--text-color);
                opacity: 0.5;
                width: fit-content;
                text-wrap: nowrap;

                &:hover {
                    opacity: 1;
                    text-decoration: underline;
                }

                &:active {
                    opacity: 0.25;
                    text-decoration: underline;
                }
            }
        }
    }

    #home {
        display: flex;
        justify-content: center;
        align-items: center;
        outline: 1px solid rgba(from var(--text-color) r g b / 0.25);
        border-radius: 1rem;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
    }
</style>
